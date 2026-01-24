import { Injectable, OnInit } from '@angular/core';
import { Point } from './point';

@Injectable({
  providedIn: 'root',
})
export class MyScore implements OnInit {

  data: Point[] = [];
  categoriesForES: string[] = [];
  categoriesForPT: string[] = [];
  subCategForES: string[] = [];
  subCategForPT: string[] = [];

  ngOnInit(): void {
    this.getFromLocalStorage();
  }

  sendToLocalStorage() {
    localStorage.setItem("scoredata", JSON.stringify(this.data));
  }

  getFromLocalStorage() {
    let tempdata = localStorage.getItem("scoredata");
    if (tempdata) {
      this.data = JSON.parse(tempdata);
    }
  }

  getConsolidateData() {
    let consolidate: any = new Object();
    consolidate = { "ES": {}, "PT": {} };

    const esArr: Point[] = this.data.filter((e) => e.language === 'es');
    const ptArr: Point[] = this.data.filter((e) => e.language === 'pt');


    if (esArr.length > 0) {
      this.categoriesForES = this.getTheCategories(esArr);
      this.subCategForES = this.getTheSubCateg(esArr);
      const summaryES = this.createObjES(esArr, this.categoriesForES, 'summaryES');
      consolidate["ES"] = summaryES;
    }


    if (ptArr.length > 0) {
      this.categoriesForPT = this.getTheCategories(ptArr);
      this.subCategForPT = this.getTheSubCateg(ptArr);
      const summaryPT = this.createObjES(ptArr, this.categoriesForPT, 'summaryPT');
      consolidate["PT"] = summaryPT;
    }

    return consolidate;
  }


  createObjES(array: Point[], categ: string[], summary: string) {
    let obj: any = new Object();
    obj = {
      [summary]: [
      ]
    }
    let categArr: any = [];
    categ.forEach((e) => {
      let subCategArr = this.defineSubCateg(e, array);
      subCategArr.forEach((f) => {
        const datesForThis = this.defineDatesForThis(e, f, array);
        datesForThis.forEach((g) => {
          const score = this.getDetailScore(e, f, g, array);
          categArr.push({
            "category": e,
            "nrocol": e.includes('write') ? 6 : (e.includes('Verb') ? 4 : 0),
            "subcategory": f,
            "date": g,
            "total": score.total,
            "perfect": score.perfect,
            "wrongs": score.wrongs,
            "goodWork": score.goodWork,
            "needImprove": score.needImprove,
          });
        });
      });
    });
    obj[`${summary}`] = categArr;
    return obj;
  }

  defineSubCateg(categ: string, array: Point[]) {
    const filtered = array.filter((e) => e.category === categ);
    const subcateg = this.getTheSubCateg(filtered);
    return subcateg;
  }

  defineDatesForThis(categ: string, subCateg: string, array: Point[]) {
    const filtered = array.filter((e) => e.category === categ && e.subcategory === subCateg);
    const result = this.getOnlyLast(filtered, 3);
    return result;
  }

  getDetailScore(categ: string, subCateg: string, date: string, array: Point[]) {
    const result = {
      "total": 0,
      "perfect": 0,
      "wrongs": 0,
      "goodWork": 0,
      "needImprove": 0,
    };
    const filter1 = array.filter((e) => e.category === categ && e.subcategory === subCateg && e.date === date);
    if (filter1.length > 0) {
      result["total"] = filter1.length;
    }
    const filter2 = array.filter((e) => e.category === categ &&
      e.subcategory === subCateg &&
      e.date === date &&
      Number(e.percent) === 100);
    if (filter2.length > 0) {
      result["perfect"] = filter2.length;
    }
    const filter3 = array.filter((e) => e.category === categ &&
      e.subcategory === subCateg &&
      e.date === date &&
      Number(e.percent) === 0);
    if (filter3.length > 0) {
      result["wrongs"] = filter3.length;
    }
    const filter4 = array.filter((e) => e.category === categ &&
      e.subcategory === subCateg &&
      e.date === date &&
      Number(e.percent) >= 67 &&
      Number(e.percent) !== 100
    );
    if (filter4.length > 0) {
      result["goodWork"] = filter4.length;
    }
    const filter5 = array.filter((e) => e.category === categ &&
      e.subcategory === subCateg &&
      e.date === date &&
      Number(e.percent) < 67 &&
      Number(e.percent) !== 0
    );
    if (filter5.length > 0) {
      result["needImprove"] = filter5.length;
    }

    return result;
  }


  // auxiliary functions
  getTheCategories(arg1: Point[]): string[] {
    const array: string[] = [];
    arg1.forEach((e) => {
      array.push(e.category);
    });
    const unique: string[] = this.uniqueArray(array);
    return unique;
  }

  getTheSubCateg(arg1: Point[]): string[] {
    const array: string[] = [];
    arg1.forEach((e) => {
      array.push(e.subcategory);
    });
    const unique: string[] = this.uniqueArray(array);
    return unique;
  }

  getOnlyLast(arg1: Point[], arg2: number): string[] {
    arg1.map((e) => this.formatAllDate(e));
    const dates: string[] = this.getTheDates(arg1);
    dates.sort((a, b) => this.compareDates(new Date(a), new Date(b)));
    let arrResult = dates.length > arg2 ? dates.slice(-arg2) : dates;
    return this.reverseArray(arrResult);
  }

  getTheDates(arg1: Point[]): string[] {
    const array: string[] = [];
    arg1.forEach((e) => {
      array.push(e.date);
    });
    const unique: string[] = this.uniqueArray(array);
    return unique;
  }

  uniqueArray(array: string[]): string[] {
    const setUnique: string[] = Array.from(
      array.reduce((set, e) => set.add(e), new Set<string>)
    );
    return setUnique;
  }

  reverseArray(arr: string[]) {
    let newArr = []
    for (let i = arr.length - 1; i >= 0; i--) {
      newArr.push(arr[i])
    }
    return newArr
  }

  formatAllDate(arg: Point) {
    const date = new Date(Date.parse(arg.date));
    const year = date.getFullYear();
    // Month is zero-indexed, so add 1
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formatted = `${year}-${month}-${day}`;
    arg.date = formatted;
  }

  compareDates(date1: Date, date2: Date): number {
    // Returns negative if date1 is earlier, 0 if equal, positive if date1 is later
    return date1.getTime() - date2.getTime();
  }


}

