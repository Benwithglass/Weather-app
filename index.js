// api key từ open weather map
const apiKey = "27e30cb8815c17057d5444e883de0ed0"; 

// tất cả thay đổi trong var weatherDataEl sẽ đc thể hiện ở div weatherData
const weatherDataEl = document.getElementById("weatherData");

// thông tin thành phố sẽ được request thông qua cityInput và mình sẽ lấy đc api weather của thành phố đó
const cityInputEl = document.getElementById("cityInput");

// add Eventlistener vô form để khi mình submit thông tin mình đã điền trong form thì web sẽ chạy 1 function có chức năng lấy thông tin từ api
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    // khi ta submit, đặc tính của submit sẽ tự động load lại trang web
    // để ngăn điều này, ta chạy cú pháp bên dưới => mỗi lần submit, trang web sẽ không tự load nữa
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue) {
    // async function là function có thể delay ở 1 số dòng sử dụng cú pháp await
    // try & catch method
    // nghĩa là ta sẽ thử request thông tin data ta muốn từ api, nếu request đúng thì mình sẽ lấy đc thông tin data... nếu sai thì thì ta sẽ lấy error thay thế thông tin ta cần
    // ví dụ của error: nếu ta vô tình gõ tên 1 thành phố nhưng sai chính tả, thành phố đó không tồn tại hoặc ko có thông tin thời tiết của thành phố đó thì ta sẽ biết được điều đó thông qua error mình nhận đc
    try {
        // lấy thông tin từ api
        // cú pháp await có chức năng bắt function phải đợi và xác nhận thông tin từ api chuyển đến hay chưa trước khi tiếp tục chạy code bên dưới

        // fetch(url)
        // 2.5 = version của api hiện tại
        // cú pháp ?q= để sử dụng query
        // ${} để gọi biến
        // mình để biến cityValue vì tên thành phố sẽ thay đổi khi mình muốn nhập tên 1 thành phố khác
        //units=metric vì mình muốn độ C thay vì độ F
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appId=${apiKey}&units=metric`)

        // nghĩa là nếu mình request và ko nhận đc thông tin thì sẽ báo lỗi với câu bên dưới
        if(!response.ok) {
            throw new Error("Network response was not ok.");
        } 
        // bắt function đợi thông tin đc chuyển hóa thành json
        const data = await response.json();

        // khi check console trên dev tool
        // ta sẽ thấy cod: 200, nghĩa là request thành công 
        // cod: 404 nghĩa là request ko thành công
        
        // Math.round để làm tròn số gần nhất
        // data để lấy dữ liệu data
        // ta muốn lấy data từ .main vì khi bật console trên dev tool ta thấy div temp ở trong div lớn main 
        // nên ta viết data.main.temp
        // nghĩa là gán tất cả dữ liệu từ div temp trong div main vào biến temperature
        const temperature = Math.round(data.main.temp);
        
        // gán giá trị tại vị trí index số 1 của mảng weather từ div description
        const description = data.weather[0].description

        
    } catch (error) {
        // lấy error từ api
    }
}
