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
		field: { type: String },
		api: { type: String },
		session: { type: String },
		total: { type: String },
	};

	constructor() {
		super();
		this.header = 'Total';
		this.currency = null;
		this.aggregator = null;
		this.api = null;
		this.session = null;
		this.total = 0;

		this._eventListener = undefined;
	}

	connectedCallback() {
		super.connectedCallback();

		const self = this;
		this._eventListener = function onMessageWrapper(event) {
			self.onMessage(event);
		};
		window.addEventListener('konfoo-message', this._eventListener);

		this.updateSummary();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		if (this._eventListener) {
			window.removeEventListener('konfoo-message', this._eventListener);
		}
	}

	onMessage(event) {
		if (
			typeof event.detail !== 'object' ||
			event.detail.type !== 'konfoo' ||
			typeof event.detail.cmd !== 'string'
		) {
			return;
		}
		const msg = event.detail;

		if (msg.cmd === 'change') {
			this.updateSummary();
		}
	}

	render() {
		return html`
			<h2>${this.header}: ${this.total}${this.currency || ''}</h2>
		`;
	}

	updateSummary() {
		let total = 0;
		fetch(`${this.api}/agg/${this.aggregator}/${this.session}`)
			.then(response => response.json())
			.then(data => {
				if (!data.data) {
					return;
				}
				for (const line of data.data) {
					if (!line || !line[this.field]) {
						continue;
					}

					const value = parseFloat(line[this.field]);
					if (isNaN(value)) continue;

					total += value;
				}
			})
			.then(() => {
				this.total = total;
			})
			.catch(err => {
				console.error('Could not fetch aggregator data:', err);
			});
	}
}
