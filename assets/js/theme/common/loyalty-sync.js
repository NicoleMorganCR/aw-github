export default class LoyaltySync {
    constructor(context = {}) {
        this.context = context;
        this.apiEndpoint = this.context?.themeSettings?.laravel_api_endpoint || this.context?.laravel_api_endpoint;
        this.apiKey = this.context?.themeSettings?.laravel_api_key || this.context?.laravel_api_key;
        this.customerId = this.getCustomerId();
    }

    getCustomerId() {
        const customerId = this.context?.customerId;

        if (customerId) {
            return customerId;
        }

        const customer = this.context?.customer;

        if (customer?.id) {
            return customer.id;
        }

        return null;
    }

    async init() {
        if (!this.customerId) {
            return;
        }

        try {
            await this.syncLoyaltyPoints();
        } catch (error) {
            console.error('[LoyaltySync] Failed to sync loyalty points:', error);
        }
    }

    async syncLoyaltyPoints() {
        const url = `${this.apiEndpoint}?customer_id=${this.customerId}&api_key=${this.apiKey}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        document.dispatchEvent(new CustomEvent('loyaltyPointsSynced', {
            detail: data,
        }));

        return data;
    }

    refresh() {
        if (!this.customerId) {
            this.customerId = this.getCustomerId();
        }

        if (!this.customerId) {
            return Promise.resolve(null);
        }

        return this.syncLoyaltyPoints();
    }
}
