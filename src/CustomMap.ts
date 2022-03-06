// 定義其他的 class 怎麼樣才能成為 addMarker 的參數
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
  color: string;
};

export class CustomMap {
  // 保護模式，不讓其他人可以調用 googleMap 參數
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  };

  // 在 type 的地方使用 |
  // typeScript 會只留下兩個裡面都擁有的屬性
  // 以目前來說，剩下的屬性只剩 location
  // 但這樣不好的點是，以後要再多加其他的屬性會要調整很多地方
  // addMaker(mappable: User | Company): void {}
  // 所以改成用 interface 這樣就不會移除其他的屬性了
  addMaker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });

      infoWindow.open(this.googleMap, marker);
    })
  };

  // addCompanyMaker(company: Company): void {
  //   new google.maps.Marker({
  //     map: this.googleMap,
  //     position: {
  //       lat: company.location.lat,
  //       lng: company.location.lng,
  //     },
  //   });
  // };
};