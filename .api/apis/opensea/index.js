import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';
class SDK {
    constructor() {
        this.spec = Oas.init(definition);
        this.core = new APICore(this.spec, 'opensea/2.0.0 (api/6.1.2)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config) {
        this.core.setConfig(config);
    }
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values) {
        this.core.setAuth(...values);
        return this;
    }
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url, variables = {}) {
        this.core.setServer(url, variables);
    }
    /**
     * Get stats for a single collection.
     *
     * @summary Get Collection Stats
     */
    get_collection_stats(metadata) {
        return this.core.fetch('/api/v2/collections/{collection_slug}/stats', 'get', metadata);
    }
    /**
     * Get a list of events based on before and after timestamps.
     *
     * @summary Get Events
     */
    list_events(metadata) {
        return this.core.fetch('/api/v2/events', 'get', metadata);
    }
    /**
     * Get a list of events for an account.
     *
     * @summary Get Events (by account)
     */
    list_events_by_account(metadata) {
        return this.core.fetch('/api/v2/events/accounts/{address}', 'get', metadata);
    }
    /**
     * Get a list of events for a collection.
     *
     * @summary Get Events (by collection)
     */
    list_events_by_collection(metadata) {
        return this.core.fetch('/api/v2/events/collection/{collection_slug}', 'get', metadata);
    }
    /**
     * Get a list of events for a single NFT.
     *
     * @summary Get Events (by NFT)
     */
    list_events_by_nft(metadata) {
        return this.core.fetch('/api/v2/events/chain/{chain}/contract/{address}/nfts/{identifier}', 'get', metadata);
    }
    /**
     * Get an OpenSea Account Profile including details such as bio, social media usernames,
     * and profile image.
     *
     * @summary Get Account
     */
    get_account(metadata) {
        return this.core.fetch('/api/v2/accounts/{address_or_username}', 'get', metadata);
    }
    /**
     * Get a single collection including details such as fees, traits, and links.
     *
     * @summary Get Collection
     */
    get_collection(metadata) {
        return this.core.fetch('/api/v2/collections/{collection_slug}', 'get', metadata);
    }
    /**
     * Get a list of OpenSea collections.
     *
     * @summary Get Collections
     */
    list_collections(metadata) {
        return this.core.fetch('/api/v2/collections', 'get', metadata);
    }
    /**
     * Get a smart contract for a given chain and address.
     *
     * @summary Get Contract
     */
    get_contract(metadata) {
        return this.core.fetch('/api/v2/chain/{chain}/contract/{address}', 'get', metadata);
    }
    /**
     * Get metadata, traits, ownership information, and rarity for a single NFT.
     *
     * @summary Get NFT
     */
    get_nft(metadata) {
        return this.core.fetch('/api/v2/chain/{chain}/contract/{address}/nfts/{identifier}', 'get', metadata);
    }
    /**
     * Get NFTs owned by a given account address.
     *
     * @summary Get NFTs (by account)
     */
    list_nfts_by_account(metadata) {
        return this.core.fetch('/api/v2/chain/{chain}/account/{address}/nfts', 'get', metadata);
    }
    /**
     * Get multiple NFTs for a collection.
     *
     * @summary Get NFTs (by collection)
     */
    list_nfts_by_collection(metadata) {
        return this.core.fetch('/api/v2/collection/{collection_slug}/nfts', 'get', metadata);
    }
    /**
     * Get multiple NFTs for a smart contract.
     *
     * @summary Get NFTs (by contract)
     */
    list_nfts_by_contract(metadata) {
        return this.core.fetch('/api/v2/chain/{chain}/contract/{address}/nfts', 'get', metadata);
    }
    /**
     * Get a smart contract for a given chain and address.
     *
     * @summary Get Payment Token
     */
    get_payment_token(metadata) {
        return this.core.fetch('/api/v2/chain/{chain}/payment_token/{address}', 'get', metadata);
    }
    /**
     * Get the traits in a collection.
     *
     * @summary Get Traits
     */
    get_traits(metadata) {
        return this.core.fetch('/api/v2/traits/{collection_slug}', 'get', metadata);
    }
    /**
     * Refresh metadata for a single NFT.
     *
     * @summary Refresh NFT Metadata
     */
    refresh_nft(metadata) {
        return this.core.fetch('/api/v2/chain/{chain}/contract/{address}/nfts/{identifier}/refresh', 'post', metadata);
    }
    /**
     * Build a portion of a criteria offer including the merkle tree needed to post an offer.
     *
     * @summary Build Criteria Offer
     */
    build_offer_v2(body) {
        return this.core.fetch('/api/v2/offers/build', 'post', body);
    }
    cancel_order(body, metadata) {
        return this.core.fetch('/api/v2/orders/chain/{chain}/protocol/{protocol_address}/{order_hash}/cancel', 'post', body, metadata);
    }
    /**
     * Create a criteria offer to purchase any NFT in a collection or which matches the
     * specified trait.
     *
     * @summary Create Criteria Offer
     */
    post_criteria_offer_v2(body) {
        return this.core.fetch('/api/v2/offers', 'post', body);
    }
    /**
     * Create an offer to purchase a single NFT (ERC721 or ERC1155).
     *
     * @summary Create Item Offer
     */
    post_offer(body, metadata) {
        return this.core.fetch('/api/v2/orders/{chain}/{protocol}/offers', 'post', body, metadata);
    }
    /**
     * List a single NFT (ERC721 or ERC1155) for sale on the OpenSea marketplace.
     *
     * @summary Create Listing
     */
    post_listing(body, metadata) {
        return this.core.fetch('/api/v2/orders/{chain}/{protocol}/listings', 'post', body, metadata);
    }
    /**
     * Retrieve all the information, including signatures, needed to fulfill a listing directly
     * onchain.
     *
     * @summary Fulfill Listing
     */
    generate_listing_fulfillment_data_v2(body) {
        return this.core.fetch('/api/v2/listings/fulfillment_data', 'post', body);
    }
    /**
     * Retrieve all the information, including signatures, needed to fulfill an offer directly
     * onchain.
     *
     * @summary Fulfill Offer
     */
    generate_offer_fulfillment_data_v2(body) {
        return this.core.fetch('/api/v2/offers/fulfillment_data', 'post', body);
    }
    /**
     * Get all active, valid listings for a single collection.
     *
     * @summary Get All Listings (by collection)
     */
    get_all_listings_on_collection_v2(metadata) {
        return this.core.fetch('/api/v2/listings/collection/{collection_slug}/all', 'get', metadata);
    }
    /**
     * Get all active, valid offers for the specified collection. This includes individual and
     * criteria offers.
     *
     * @summary Get All Offers (by collection)
     */
    get_all_offers_on_collection_v2(metadata) {
        return this.core.fetch('/api/v2/offers/collection/{collection_slug}/all', 'get', metadata);
    }
    /**
     * Get the best listing for an NFT.
     *
     * @summary Get Best Listing (by NFT)
     */
    get_best_listing_on_nft_v2(metadata) {
        return this.core.fetch('/api/v2/listings/collection/{collection_slug}/nfts/{identifier}/best', 'get', metadata);
    }
    /**
     * Get the cheapest priced active, valid listings on a single collection.
     *
     * @summary Get Best Listings (by collection)
     */
    get_best_listings_on_collection_v2(metadata) {
        return this.core.fetch('/api/v2/listings/collection/{collection_slug}/best', 'get', metadata);
    }
    /**
     * Get the best offers for an NFT.
     *
     * @summary Get Best Offer (by NFT)
     */
    get_best_offer_on_nft_v2(metadata) {
        return this.core.fetch('/api/v2/offers/collection/{collection_slug}/nfts/{identifier}/best', 'get', metadata);
    }
    /**
     * Get the active, valid collection offers for the specified collection.
     *
     * @summary Get Collection Offers
     */
    get_collection_offers_v2(metadata) {
        return this.core.fetch('/api/v2/offers/collection/{collection_slug}', 'get', metadata);
    }
    /**
     * Get the active, valid individual offers. This does not include criteria offers.
     *
     * @summary Get Item Offers
     */
    get_offers(metadata) {
        return this.core.fetch('//api/v2/orders/{chain}/{protocol}/offers', 'get', metadata);
    }
    /**
     * Get the complete set of active, valid listings.
     *
     * @summary Get Listings
     */
    get_listings(metadata) {
        return this.core.fetch('//api/v2/orders/{chain}/{protocol}/listings', 'get', metadata);
    }
    /**
     * Get a single order, offer or listing, by its order hash. Protocol and Chain are required
     * to prevent hash collisions.
     *
     * @summary Get Order
     */
    get_order(metadata) {
        return this.core.fetch('/api/v2/orders/chain/{chain}/protocol/{protocol_address}/{order_hash}', 'get', metadata);
    }
    /**
     * Get the active, valid trait offers for the specified collection.
     *
     * @summary Get Trait Offers
     */
    get_trait_offers_v2(metadata) {
        return this.core.fetch('/api/v2/offers/collection/{collection_slug}/traits', 'get', metadata);
    }
}
const createSDK = (() => { return new SDK(); })();
export default createSDK;
