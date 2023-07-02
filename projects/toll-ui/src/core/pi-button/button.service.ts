import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

    primaryCSS =
        'focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900'
    successCSS =
        'focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
    dangerCSS =
        'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
    warningCSS =
        'focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium dark:focus:ring-yellow-900'
    darkCSS =
        'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
    lightCSS =
        'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'

    primaryOutlineCSS =
        'text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800'
    successOutlineCSS =
        'text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'
    dangerOutlineCSS =
        '"text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
    warningOutlineCSS =
        'text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900'
    darkOutlineCSS =
        'text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'
    lightOutlineCSS =
        'text-white border border-white focus:outline-none hover:bg-white focus:ring-4 focus:ring-gray-200 font-medium dark:bg-gray-800 dark:text-white dark:border-white dark:hover:bg-white/60 dark:hover:text-black dark:hover:border-white dark:focus:ring-gray-700'

    extra_small = 'px-3 py-2 text-xs'
    small = 'px-3 py-2 text-sm'
    normal = 'text-sm px-5 py-2.5'
    large = 'px-5 py-3 text-base'
    extra_large = 'text-base px-6 py-3.5'

    roundedFullCSS = 'rounded-full'
    roundedCSS = 'rounded-lg'
  constructor() { }
}
