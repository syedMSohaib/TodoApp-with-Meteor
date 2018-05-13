import React, { Component } from 'react';
import { Tasks } from '../api/tasks.js';
import { Meteor } from 'meteor/meteor';


export default class Task extends Component{

	toggleChecked(){
		if( Meteor.user() ){
			Tasks.update(this.props.task._id, {
				$set: { checked : !this.props.task.checked },
			});
		}else
			alert('User Not Logged In');
	}

	deleteThisTask(){
		if( Meteor.user() ){
			Tasks.remove(this.props.task._id);
		}else
			alert('User Not Logged In');
	}

	render(){
	const taskClassName = this.props.task.checked ? 'checked' : '';
		return ( 
	      <li className={taskClassName}>
	        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
	          &times;
	        </button>
	 
	        <input
	          type="checkbox"
	          readOnly
	          checked={!!this.props.task.checked}
	          onClick={this.toggleChecked.bind(this)}
	        />
	 
 				<strong>{this.props.task.username}</strong>: {this.props.task.text}
 	      </li>
		);
	}
}