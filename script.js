async function downloadVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultDiv = document.getElementById('result')

    if (!videoUrl) {
        alert('Vui lòng nhập Url video Tiktok');
        return;
    }

    try {
        const apiUrl = 'https://tiktok-video-no-watermark2.p.rapidapi.com/';
        const params = new URLSearchParams({
            url: videoUrl,
            hd: '1'
        });

        const response = await fetch(`${apiUrl}?${params.toString()}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com',
                'X-RapidAPI-Key': '5fd405953amshb6903c834ce518bp1c8c53jsnd90402e2341a'
            }
        });

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
        resultDiv.innerHTML = '<p>Đã xảy ra lỗi khi tải video!</p>';
    }
}
    
