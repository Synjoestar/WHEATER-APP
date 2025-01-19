/**
 * Memilih elemen utama container aplikasi cuaca.
 * @type {HTMLElement}
 */
const container = document.querySelector('.container');

/**
 * Memilih tombol pencarian di dalam kotak pencarian.
 * @type {HTMLElement}
 */
const search = document.querySelector('.search-box button');

/**
 * Memilih elemen kotak cuaca yang menampilkan informasi cuaca utama.
 * @type {HTMLElement}
 */
const weatherBox = document.querySelector('.weather-box');

/**
 * Memilih elemen detail cuaca yang menampilkan informasi tambahan cuaca.
 * @type {HTMLElement}
 */
const weatherDetails = document.querySelector('.weather-details');

/**
 * Memilih elemen untuk menampilkan pesan error ketika kota tidak ditemukan.
 * @type {HTMLElement}
 */
const error404 = document.querySelector('.not-found');

/**
 * Menambahkan event listener pada tombol pencarian untuk menangani klik
 * dan mengambil data cuaca dari API.
 */
search.addEventListener('click', () => {

    /**
     * API key untuk mengakses OpenWeatherMap API.
     * @type {string}
     */
    const APIKey = '4cef1c3fab844183d470a5ae78022ceb';

    /**
     * Nama kota yang dimasukkan oleh pengguna pada kotak pencarian.
     * @type {string}
     */
    const city = document.querySelector('.search-box input').value;

    // Menghentikan proses jika input kota kosong.
    if (city === '')
        return;

    /**
     * Mengambil data cuaca dari OpenWeatherMap API berdasarkan input pengguna.
     */
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            // Menangani kasus jika kota tidak ditemukan (error 404).
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            // Menyembunyikan pesan error jika kota ditemukan.
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            /**
             * Memperbarui elemen kotak cuaca dengan data cuaca yang diambil.
             */
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Menentukan ikon cuaca yang sesuai berdasarkan kondisi cuaca.
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            // Memperbarui elemen cuaca dengan temperatur, deskripsi, kelembapan, dan kecepatan angin.
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Menampilkan kotak cuaca dan detail dengan efek animasi.
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

        });

});
