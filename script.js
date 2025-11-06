        function trelloApp() {
            return {
                tasks: [],
                newTask: {
                    titre: '',
                    description: '',
                    statut: 'A faire'
                },
                editingTask: null,
                searchTerm: '',
                filterStatus: '',

                init() {
                    const saved = localStorage.getItem('miniTrelloTasks');
                    if (saved) {
                        this.tasks = JSON.parse(saved);
                    }
                },

                addTask() {
                    if (this.newTask.titre) {
                        this.tasks.push({
                            id: Date.now(),
                            titre: this.newTask.titre,
                            description: this.newTask.description,
                            statut: this.newTask.statut
                        });
                        this.saveTasks();
                        this.resetForm();
                    }
                },

                editTask(task) {
                    this.editingTask = task.id;
                    this.newTask = {
                        titre: task.titre,
                        description: task.description,
                        statut: task.statut
                    };
                },

                updateTask() {
                    const task = this.tasks.find(t => t.id === this.editingTask);
                    if (task) {
                        task.titre = this.newTask.titre;
                        task.description = this.newTask.description;
                        task.statut = this.newTask.statut;
                        this.saveTasks();
                        this.cancelEdit();
                    }
                },

                cancelEdit() {
                    this.editingTask = null;
                    this.resetForm();
                },

                deleteTask(id) {
                    this.tasks = this.tasks.filter(t => t.id !== id);
                    this.saveTasks();
                },

                changeStatus(id, newStatus) {
                    const task = this.tasks.find(t => t.id === id);
                    if (task) {
                        task.statut = newStatus;
                        this.saveTasks();
                    }
                },

                resetForm() {
                    this.newTask = {
                        titre: '',
                        description: '',
                        statut: 'A faire'
                    };
                },

                saveTasks() {
                    localStorage.setItem('miniTrelloTasks', JSON.stringify(this.tasks));
                },

                getTasksByStatus(status) {
                    return this.tasks.filter(t => t.statut === status);
                },

                filteredTasks() {
                    return this.tasks.filter(task => {
                        const matchesSearch = task.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                                            task.description.toLowerCase().includes(this.searchTerm.toLowerCase());
                        const matchesStatus = !this.filterStatus || task.statut === this.filterStatus;
                        return matchesSearch && matchesStatus;
                    });
                },

                filteredTasksByColumn(status) {
                    return this.filteredTasks().filter(task => task.statut === status);
                }
            }
        }