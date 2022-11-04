export interface Path {
  name: string;
  query: any;
  params: any;
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
