export class GlobalResponse {
  message: string;
  status: boolean;
  constructor(
    message: string,
    status: boolean,
    dataObj?: object,
    type: string = 'data',
  ) {
    this.message = message;
    this.status = status;
    if (dataObj && type) {
      this[type] = dataObj;
    }
  }
}

// export class GlobalResponse {
//   message: string;
//   status: boolean;
//   [key: string]: any; // Allows dynamic properties

//   constructor(message: string, status: boolean, dataObj?: Record<string, any>) {
//     console.log('🚀 ~ GlobalResponse ~ constructor ~ dataObj:', dataObj);
//     this.message = message;
//     this.status = status;

//     if (dataObj) {
//       const key = Object.keys(dataObj)[0]; // Get the first key (e.g., 'user', 'profiles')
//       this[key] = dataObj; // Assign the entire object under that key
//     }
//   }
// }
