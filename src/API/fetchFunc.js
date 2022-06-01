export const getData = (successCallback) => {
    fetch(
        'https://reqres.in/api/products'
      )
        .then((r) => r.json())
        .then((data) => {
          if (data && typeof successCallback === "function") {
            successCallback(data);
          }
        })
        .catch((err) => console.log(err));
}