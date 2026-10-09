export const provenance = { date: '2026-10-09', label: 'Thông tin do người dùng cung cấp', status: 'Chưa xác minh' };
export const restaurants = [
 {slug:'nem-nuong-ba-hung',name:'Nem nướng Bà Hùng',address:'328 Phan Đình Phùng',houseNumber:'328',dish:'nem-nuong',verified:false,hours:null,price:null},
 {slug:'mi-quang-xi',name:'Mì Quảng Xí',address:'đường Mạc Đỉnh Chi',houseNumber:null,dish:'mi-quang',verified:false,hours:null,price:null},
 {slug:'bun-bo-hong',name:'Bún Bò Hồng',address:'đường Phan Đình Phùng',houseNumber:null,dish:'bun-bo',verified:false,hours:null,price:null}
];
export const dishes = [
 {slug:'nem-nuong',name:'Nem nướng',category:'mon-cuon',label:'Món cuốn',kicker:'Cuốn một chút, kể một chuyện',intro:'Một lựa chọn để bắt đầu hành trình ăn uống của bạn. Khám phá địa chỉ được gợi ý và kiểm tra thông tin trước khi ghé.',note:'Hỏi quán về thành phần món ăn, nước chấm và rau ăn kèm nếu bạn có dị ứng hoặc chế độ ăn riêng.',image:'/images/nem-nuong.webp'},
 {slug:'mi-quang',name:'Mì Quảng',category:'mon-nuoc',label:'Món nước',kicker:'Một tô mì, một điểm dừng',intro:'Đổi nhịp chuyến đi bằng một món mì. Lưu lại địa chỉ gợi ý dưới đây để tìm hiểu thêm trước khi quyết định.',note:'Hỏi quán về lựa chọn topping, thành phần nước dùng và khẩu phần hiện có.',image:'/images/mi-quang.webp'},
 {slug:'bun-bo',name:'Bún bò',category:'mon-nuoc',label:'Món nước',kicker:'Thêm một món vào lịch trình',intro:'Một gợi ý món nước cho hành trình khám phá Đà Lạt. Thông tin quán hiện là dữ liệu ban đầu, chưa được biên tập xác minh.',note:'Hỏi quán về mức cay, thành phần nước dùng và giờ phục vụ thực tế.',image:'/images/bun-bo.webp'}
];
export function normalize(value) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().trim(); }
export function searchDishes(query='',category='all') {
 const q=normalize(query);
 return dishes.filter(d => (category==='all'||category===d.category) && normalize(`${d.name} Đà Lạt ${restaurants.filter(r=>r.dish===d.slug).map(r=>`${r.name} ${r.address}`).join(' ')}`).includes(q));
}
export function mapsSearchUrl(r) { return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${r.name}, ${r.address}, Đà Lạt`)}`; }
