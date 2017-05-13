/* react */
import React, { Component } from 'react';

/* css */
import './RulesModal.css';

export class RulesModal extends Component {
	render() {
		return (
			<div className="RulesModal">
				<h1 className="header">Rules</h1>
				<ol className="RulesModal-list">
					<li className="body">
						Any harassment of competition organizers, judges, or entrants
						will result in an immediate disqualification, and, if the conduct
						warrants it, a ban from future competitions. HYPERCOMP is a safe,
						inclusive, kind place, and attempts to alter this will 
						not be tolerated.
					</li>

					<li className="body">
						Entries must be entirely unpublished at the beginning of the
						competition. If the entry has been posted online, and people you
						don't know and those who aren't specifically tasked with
						testing the entry have read the entry, it is ineligible.
					</li>

					<li className="body">
						Entries must be hypertext. While this is not a strict rule, and
						authors are not expected to adhere to a specific definition of
						hypertext, entries should still represent some of the
						defining qualities of hypertext -- pages as nodes, navigation
						between nodes using links, etc.
					</li>

					<li className="body">
						Editing is allowed throughout the entirety of the competition.
						Any edits are allowed, whether bugfixes, content edits, or even
						entire new sections. You are encouraged to continue to write and
						develop your entry throughout the whole of the competition.
					</li>

					<li className="body">
						Entrants are allowed to discuss their work on any platform they
						wish, and to encourage others to participate as judges, but 
						they are not allowed to request that others vote on their
						entry.
					</li>

					<li className="body">
						Judges are allotted 40 points. They are free to award these
						points to any entry. For example, a judge could award 40
						points to a single entry, and none to any others; or they
						could award 1 point to 40 separate entries; or anything
						in-between. 
					</li>

					<li className="body">
						HYPERCOMP is for the enjoyment of its participants and the
						advancement of hypertext as an art form. It is not a contest
						intended to prove in Darwinian fashion who is the final,
						ultimate, best hypertext author. Be nice, and above all,
						have fun!
					</li>
				</ol>
			</div>
		);
	}
}

export default RulesModal;