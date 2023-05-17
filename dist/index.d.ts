export interface Path {
    name?: string;
    path?: string;
    params?: {
        [k in string]: string;
    };
    query?: {
        [k in string]: string;
    };
}
export interface Child {
    id: number | string;
    icon?: string;
    title?: string;
    badge?: number | string;
    path?: Path | string;
}
export interface CurvedOption {
    id: number | string;
    icon?: string;
    title?: string;
    badge?: number | string;
    path?: Path | string;
    childs?: Child[];
    isActive?: boolean;
}
export interface CurvedProps {
    modelValue: number | string | null;
    options: CurvedOption[];
    foregroundColor?: string;
    backgroundColor?: string;
    iconColor?: string;
    badgeColor?: string;
    replaceRoute?: boolean;
}
export interface GrowOption {
    id: number | string;
    icon?: string;
    title?: string;
    color?: string;
    selected?: boolean;
    path?: Path | string;
}
export interface GrowProps {
    modelValue: number | string | null;
    options: GrowOption[];
    color?: string;
    replaceRoute?: boolean;
}
export interface RingOption {
    id: number | string;
    icon?: string;
    title?: string;
    badge?: number | string;
    selected?: boolean;
    deselect?: boolean;
    path?: Path | string;
}
export interface RingProps {
    modelValue: number | string | null;
    options: RingOption[];
    titleColor?: string;
    borderColor?: string;
    badgeColor?: string;
    iconColor?: string;
    replaceRoute?: boolean;
}
export interface SwipeOption {
    id: number | string;
    icon?: string;
    title?: string;
    selected?: boolean;
    path?: Path | string;
}
export interface SwipeProps {
    modelValue: number | string | null;
    options: SwipeOption[];
    swiperColor?: string;
    backgroundColor?: string;
    iconColor?: string;
    replaceRoute?: boolean;
}
export interface WindowsOption {
    id: number | string;
    icon?: string;
    title?: string;
    color?: string;
    badge?: number | string;
    selected?: boolean;
    deselect?: boolean;
    path?: Path | string;
}
export interface WindowsProps {
    modelValue: number | string | null;
    options: WindowsOption[];
    swiperColor?: string;
    backgroundColor?: string;
    iconColor?: string;
    replaceRoute?: boolean;
}
export interface HillOption {
    id: number | string;
    icon?: string;
    badge?: number;
    selected?: boolean;
    path?: Path | string;
}
export interface HillProps {
    modelValue: number | string | null;
    options: HillOption[];
    color?: string;
    backgroundColor?: string;
    badgeColor?: string;
    replaceRoute?: boolean;
}
export interface FlashlightOption {
    id: number | string;
    icon?: string;
    selected?: boolean;
    path?: Path | string;
}
export interface FlashlightProps {
    modelValue: number | string | null;
    options: HillOption[];
    flashlightColor?: string;
    backgroundColor?: string;
    iconColor?: string;
    replaceRoute?: boolean;
}
