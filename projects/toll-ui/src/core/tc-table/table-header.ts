import {TemplateRef} from "@angular/core";

export interface TableHeader {
  name: string;
  parent?: string;
  alias?: string;
  isObject?: boolean;
  type?: 'string' | 'boolean' | 'image' | 'date'
}
