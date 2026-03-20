
export interface BaseType {
    id: number;
    name: string;
    price?: number;
    image_url?: string;
    barcode_url?: String;
}

export interface Bowl extends BaseType{
 base_type_id?: number;
    volume?: number;
    slot_count: number;
    shape: 'round' | 'square';

}