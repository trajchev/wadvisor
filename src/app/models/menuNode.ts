export interface MenuNode {
    title: string;
    details?: string;
    key?: string;
    sports?: MenuNode[];
}