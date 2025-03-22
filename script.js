
async function downloadVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultDiv = document.getElementById('result');

    if (!videoUrl) {
        alert('Vui lòng nhập Url video Tiktok');
        return;
    }

    try {
        // API mới dành cho tải video Tiktok không logo (cần thay thế bằng API chính xác nếu có)
        const apiUrl = 'https://social-download-all-in-one.p.rapidapi.com/';
        const params = new URLSearchParams({
            url: videoUrl,
            hd: '1'
        });

        const response = await fetch(`${apiUrl}?${params.toString()}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'social-download-all-in-one.p.rapidapi.com',
                'X-RapidAPI-Key': 'cf1d62f86emsh3cf093a504a6296p1bfbfbjsn69c5bc8038a3'
            }
        });

        if (!response.ok) {
            throw new Error(`Lỗi mạng: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (data && data.data && data.data.play) {
            resultDiv.innerHTML = `
                <p>Video đã tải xuống thành công!</p>
                <video controls src="${data.data.play}" width="400"></video>
                <a href="${data.data.play}" download="tiktok-video.mp4">Tải về</a>
            `;
        } else {
            resultDiv.innerHTML = '<p>Không thể tải xuống video. Kiểm tra lại URL!</p>';
        }
    } catch (error) {
        console.error('Lỗi:', error);
        resultDiv.innerHTML = `<p>Đã xảy ra lỗi: ${error.message}</p>`;
    }
}
