class StateHolder {
  constructor(props) {
    this.state = {
      uuidArray: props.uuidArray,
      passwordRecordsArray: props.passwordRecordsArray,
    };
  }
}

var stateHolder = new StateHolder({
  uuidArray: [1],
  passwordRecordsArray: [2],
});

module.exports = stateHolder;
