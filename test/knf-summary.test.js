import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../knf-summary.js';

describe('KnfSummary', () => {
	it('has a default title "Hey there" and counter 5', async () => {
		const el = await fixture(html`<knf-summary></knf-summary>`);

		expect(el.title).to.equal('Hey there');
		expect(el.counter).to.equal(5);
	});

	it('increases the counter on button click', async () => {
		const el = await fixture(html`<knf-summary></knf-summary>`);
		el.shadowRoot.querySelector('button').click();

		expect(el.counter).to.equal(6);
	});

	it('can override the title via attribute', async () => {
		const el = await fixture(
			html`<knf-summary title="attribute title"></knf-summary>`
		);

		expect(el.title).to.equal('attribute title');
	});

	it('passes the a11y audit', async () => {
		const el = await fixture(html`<knf-summary></knf-summary>`);

		await expect(el).shadowDom.to.be.accessible();
	});
});
