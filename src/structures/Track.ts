/**
 * Track structure
 */
import { Restriction, CodeImageReturn, DominantColor } from "./Interface";
import Util from '../Spotify';
import SimplifiedArtist from "./SimplifiedArtist";
import SimplifiedAlbum from "./SimplifiedAlbum";

const util = new Util();

/**
 * LinkedTrack Class
 */
export class LinkedTrack{

    data: any;
    externalUrls: any;
    href: string;
    id: string;
    type: string;
    uri: string;

    /**
     * **Example:**
     * 
     * ```js
     * const track = new LinkedTrack(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     */
    constructor(data){

        Object.defineProperty(this, 'data', { value: data, writable: false });

        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.type = data.type;
        this.uri = data.uri;

    };

    /**
     * Returns the code image with dominant color
     */
    async getCodeImage(): Promise<CodeImageReturn> {
        return await util.getCodeImage(this.uri);
    };

    /**
     * Returns the uri data
     */
    async getURIData(): Promise<any> {
        return await util.getURIData(this.uri);
    };

};

/**
 * Track class
 */
export default class Track {

    data: any;
    availableMarkets: string[];
    discNumber: number;
    duration: number;
    explicit: boolean;
    externalIds: any;
    externalUrls: any;
    href: string;
    id: string;
    name: string;
    popularity: number;
    previewUrl: string;
    trackNumber: number;
    type: string;
    uri: string;
    local: boolean;
    playable?: boolean;
    linkedFrom?: LinkedTrack;
    restrictions?: Restriction;
    codeImage?: string;
    dominantColor?: DominantColor;

    /**
     * **Example:**
     * 
     * ```js
     * const track = new Track(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     */
    constructor(data){

        Object.defineProperty(this, 'data', { value: data, writable: false });

        this.availableMarkets = data.available_markets;
        this.discNumber = data.disc_number;
        this.duration = data.duration_ms;
        this.explicit = data.explicit;
        this.externalIds = data.external_ids;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.name = data.name;
        this.popularity = data.popularity;
        this.previewUrl = data.preview_url;
        this.trackNumber = data.track_number;
        this.type = data.type;
        this.uri = data.uri;
        this.playable = data.is_playable;
        this.restrictions = data.restrictions;
        this.local = Boolean(data.is_local);
        if('linked_from' in data) this.linkedFrom = data.linked_from;
        
    };

    /**
     * Album object
     * @readonly
     */
    get album(): SimplifiedAlbum {
        return new SimplifiedAlbum(this.album);
    };

    /**
     * Returns the array of SimplifiedArtist
     * @readonly
     */
    get artists(): SimplifiedArtist[] {
        return this.data.map(x => new SimplifiedArtist(x));
    };

    /**
     * Returns the code image with dominant color
     */
    async getCodeImage(): Promise<CodeImageReturn> {
        return await util.getCodeImage(this.uri);
    };

    /**
     * Returns the uri data
     */
    async getURIData(): Promise<any> {
        return await util.getURIData(this.uri);
    };

};