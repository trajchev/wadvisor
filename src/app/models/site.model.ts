import { region } from './region.model';

export class SiteModel {
    id: number;
    key: string;
    region: region;
    createdAt: Date | string;
    updatedAt: Date | string;

}