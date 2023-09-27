import React, { Component } from 'react';

class CalorieCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: '',
      goal: 'maintenance',
      result: null, // Initialize result as null
      message: '',
    };

    // Create a ref for the weight input field
    this.weightInputRef = React.createRef();
  }

  handleWeightChange = (e) => {
    const newWeight = e.target.value;
    this.setState({ weight: newWeight !== '' ? parseFloat(newWeight) : '' });
  }

  handleGoalChange = (e) => {
    this.setState({ goal: e.target.value, result: null, message: '' }); // Reset result and message when the goal changes
  }

  calculateCalories = () => {
    const weight = parseFloat(this.state.weight);
    let result = 0;
    let message = '';

    if (this.state.goal === 'weightGain') {
      result = weight * 20;
      message = `To gain weight, increase your calorie intake by ${result} kcal.`;
    } else if (this.state.goal === 'weightLoss') {
      result = weight * 15;
      message = `To lose weight, reduce your calorie intake by ${result} kcal.`;
    } else {
      // Calculate maintenance calorie using Mifflin-St Jeor equation
      if (this.state.gender === 'male') {
        result = 10 * weight + 6.25 * 170 - 5 * 30 + 5;
      } else {
        result = 10 * weight + 6.25 * 160 - 5 * 30 - 161;
      }
      message = `Your maintenance calorie is ${result} kcal.`;
    }

    this.setState({ result, message });
  }

  resetForm = () => {
    this.setState({
      weight: '',
      goal: 'maintenance',
      result: null, // Reset result to null
      message: '',
    });

    // Clear the input field using the ref
    if (this.weightInputRef.current) {
      this.weightInputRef.current.value = '';
    }
  }

  render() {
    return (
      <div className="container">
        <div className="CalorieCalculator">
          <h1>Calorie Calculator!</h1>
          <label>
            Enter Your Weight (in kg)
            <input type="number" onChange={this.handleWeightChange} value={this.state.weight} ref={this.weightInputRef} />
          </label>
          <br />
          <label>
            Select Your Goal
            <select onChange={this.handleGoalChange}>
              <option value="maintenance">Maintenance Calorie</option>
              <option value="weightGain">Weight Gain</option>
              <option value="weightLoss">Weight Loss</option>
            </select>
          </label>
          <br />
          <div className="cont">
            <button onClick={this.calculateCalories}>Calculate</button>
            <button onClick={this.resetForm}>Reset</button>
          </div>
          <br />
          {this.state.result !== null && ( // Displays the output only when result is not null
            this.state.goal === 'maintenance' ? (
              <p>Your daily calorie intake is {this.state.result} kcal</p>
            ) : (
              <p>{this.state.message}</p>
            )
          )}
        </div>
      </div>
    );
  }
}

export default CalorieCalculator;
