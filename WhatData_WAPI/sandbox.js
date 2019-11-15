const cacheClass = require("./Cache_class");
const Cache = new cacheClass({Address: "localhost", Port: 6379}, false, false, true);

// Cache.SetHash({set: [
//     {
//         name: "1",
//         key: "Example",
//         value: "Example_Value"
//     },
//     {
//         name: "2",
//         key: "Example222222",
//         value: "Example_Value222222222222"
//     }
// ]})

// Cache.SetHash({ set: [
//     {
//         name: "1",
//         key: "Example",
//         value: "Example_Value"
//     }
// ]}, (d) => { console.log(`SetHash => ${d}`) });

// Cache.SetHashSingle({
//     name: "1",
//     key: "Example",
//     value: "Example_Value_Single"
// }, (d) => { console.log(`SetHashSingle => ${d}`) });

// Cache.SetHash({ set: [
//     {
//         name: "1",
//         key: "Example",
//         value: "Example_Value_Not"
//     }
// ]}, () => {});

Cache._GetHashSingle("15", (data) => {
    console.log(data);
});
