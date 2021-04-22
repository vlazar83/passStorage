class StateHolder {
  constructor(props) {
    this.state = {
      uuidArray: props.uuidArray,
      passwordRecordsArray: props.passwordRecordsArray,
    };
  }
}

var stateHolder = new StateHolder({
  uuidArray: [],
  passwordRecordsArray: [],
});

module.exports = stateHolder;
