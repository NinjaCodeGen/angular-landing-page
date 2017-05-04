/*
 * Example use
 *		Basic Array of single type: *ngFor="let todo of todoService.todos | orderBy : '-'"
 *		Multidimensional Array Sort on single column: *ngFor="let todo of todoService.todos | orderBy : ['-status']"
 *		Multidimensional Array Sort on multiple columns: *ngFor="let todo of todoService.todos | orderBy : ['status', '-title']"
 */

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'orderBy', pure: false })
export class OrderBy implements PipeTransform {

  static _orderByComparator(a: any, b: any): number {

try { // HACK cuz error when delete entire textbox of number and it compares
    if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
      //Isn't a number so lowercase the string to properly compare
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
    } else {
      //Parse strings as numbers to compare properly
      if (parseFloat(a) < parseFloat(b)) return -1;
      if (parseFloat(a) > parseFloat(b)) return 1;
    }
} catch(e) {
    return 1;
}

    return 0; //equal each other
  }

  /* filter property by string 'parent.child.item.orderKey' */
  static _getDeepValue(obj: any, propertyPath: string) {

    let pathList = propertyPath.split('??');

    if (pathList.length > 0) {
      let index = 0,
        flag = false,
        result = '';

      while (!flag) {
        result = getDeepvalueByPath(obj, pathList[index]);

        if (result !== undefined) {
          flag = true;
        } else {
          index++;

          if (pathList.length === index) {
            flag = true;
          }
        }
      }

      return result;
    } else {
      return getDeepvalueByPath(obj, propertyPath);
    }

    function getDeepvalueByPath(obj, path) {
      path = path.split('.');

      if (path.length > 0) {
        for (let i = 0; i < path.length; i++) {
          if (obj[path[i]] !== undefined) {
            obj = obj[path[i]];
          } else {
            obj = undefined;
            break;
          }
        };

        return obj;
      } else {
        return obj[path];
      }
    }
  }

  transform(input: any, [config = '+']): any {
    if (!Array.isArray(input)) return input;

    if (!Array.isArray(config) || (Array.isArray(config) && config.length === 1)) {
      var propertyToCheck: string = !Array.isArray(config) ? config : config[0];
      var desc = propertyToCheck.substr(0, 1) === '-';

      //Basic array
      if (!propertyToCheck || propertyToCheck === '-' || propertyToCheck === '+') {
        return !desc ? input.sort() : input.sort().reverse();
      } else {
        var property: string = propertyToCheck.substr(0, 1) === '+' || propertyToCheck.substr(0, 1) === '-'
          ? propertyToCheck.substr(1)
          : propertyToCheck;

        return input.sort(function (a: any, b: any) {
          return !desc
            ? OrderBy._orderByComparator(OrderBy._getDeepValue(a, property), OrderBy._getDeepValue(b, property))
            : -OrderBy._orderByComparator(OrderBy._getDeepValue(a, property), OrderBy._getDeepValue(b, property));
        });
      }
    } else {
      //Loop over property of the array in order and sort
      return input.sort(function (a: any, b: any) {
        for (var i: number = 0; i < config.length; i++) {
          var desc = config[i].substr(0, 1) === '-';
          var property = config[i].substr(0, 1) === '+' || config[i].substr(0, 1) === '-'
            ? config[i].substr(1)
            : config[i];

          var comparison = !desc
            ? OrderBy._orderByComparator(OrderBy._getDeepValue(a, property), OrderBy._getDeepValue(b, property))
            : -OrderBy._orderByComparator(OrderBy._getDeepValue(a, property), OrderBy._getDeepValue(b, property));

          //Don't return 0 yet in case of needing to sort by next property
          if (comparison !== 0) return comparison;
        }

        return 0; //equal each other
      });
    }
  }
}
