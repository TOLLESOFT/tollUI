export interface Alert {
  id?: string,
  type: 'info' | 'warning' | 'danger' | 'success',
  message: string,
  title?: string,
  duration?: number,
  clear?: boolean
}
