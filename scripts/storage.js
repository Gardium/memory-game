const storage = {
  best: 999, 

  setRecord(value) {
    this.best = value;
    this.storeData();
  },

  storeData() {
    localStorage.setItem('data', storage.best);
  }

}
