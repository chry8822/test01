import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { format, minDate, maxDate, now } from './utils';

const DatePicker = require("rmc-date-picker")


export default class Test extends React.Component<any, any> {

  constructor(props:any) {
    super(props);
    this.state = {
      date: new Date(2017, 2, 31, 15, 1, 1),
      mode: 'datetime',
    };
  }

  onDateChange = (date:any) => {
    console.log('onChange', format(date));
    this.setState({
      date,
    });
  }

  onValueChange = (values:any, index:any) => {
    console.log('onValueChange', values, index);
  }

  onScrollChange = (values:any, index:any) => {
    console.log('onScrollChange', values, index);
  }

  changeMode = (e:any) => {
    this.setState({
      mode: e.target.value,
    });
  }

  render() {
    const props = this.props;
    const { date, mode } = this.state;

    return (<div style={{ margin: '10px 30px' }}>
      <h2>date picker</h2>

      <select value={this.state.mode} onChange={this.changeMode}>
        <option>datetime</option>
        <option>date</option>
        <option>time</option>
        <option>month</option>
        <option>year</option>
      </select>

      <div>
        <span>{date && format(date) || format(now)}</span>
        <DatePicker
          rootNativeProps={{'data-xx': 'yy'}}
          defaultDate={date || now}
          mode={mode}
          locale={props.locale}
          maxDate={maxDate}
          minDate={minDate}
          onDateChange={this.onDateChange}
          onValueChange={this.onValueChange}
          onScrollChange={this.onScrollChange}
          use12Hours
        />
      </div>
    </div>);
  }
}

