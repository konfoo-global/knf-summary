import { html, css, LitElement } from 'lit';

export class KnfSummary extends LitElement {
	static styles = css`
		:host {
			display: block;
			padding: 25px;
			color: var(--knf-summary-text-color, #000);
		}
	`;

	static properties = {
		header: { type: String },
		currency: { type: String },
		aggregator: { type: String },
		api: { type: String },
		session: { type: String },
	};

	constructor() {
		super();
		this.header = 'Total';
		this.currency = null;
		this.aggregator = null;
		this.api = null;
		this.session = null;
		this.total = 0;
	}

	connectedCallback() {
		console.log('connectedCallback');
		super.connectedCallback();
		window.addEventListener('konfoo-message', this.onMessage);

		// console.log('window = ', window);
		// window.dispatchEvent(new CustomEvent('konfoo-message', { detail: 'wtf' }));
	}

	disconnectedCallback() {
		console.log('disconnectedCallback');
		super.disconnectedCallback();
		window.removeEventListener('konfoo-message', this.onMessage);
	}

	onMessage(event) {
		console.log('[component] konfoo-message', event.detail);
	}

	render() {
		return html`
			<h2>${this.header}: ${this.total}${this.currency || ''}</h2>
		`;
	}
}
