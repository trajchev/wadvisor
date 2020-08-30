import { region } from './region.model';

export class SiteModel {
    id: number;
    key: string;
    name: string;
    region: region;
    createdAt: Date | string;
    updatedAt: Date | string;

}
