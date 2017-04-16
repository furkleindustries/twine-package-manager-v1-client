import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
	render() {
		const content = React.cloneElement(this.props.content, {
			closeModal: this.props.closeModal,
		});

		return (
			<div className="Modal">
				<button
					className="Modal-close"
					onClick={this.props.closeModal}>
					✖
				</button>
				<div
					className="Modal-contentContainer"
					onKeyDown={e => {
						if (e.keyCode === 27 || e === 'manual') {
							this.props.closeModal();
						}
					}}>
					{content}
				</div>
			</div>
		);
	}
}

export default Modal;