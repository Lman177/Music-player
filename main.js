     /**
 * 1. Render songs
 * 2. Scroll top
 * 3. Play /pause / seek
 * 4. CD rotate
 * 5. Next / previous
 * 6. Random
 * 7. Next/ Repeat when end
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random.active");
const repeatBtn = $(".btn-repeat.active");
const playlist = $(".playlist");
const app = {
    currentIndex : 0,
    isPlaying : false,
    
    songs: [
        {
            name: "Sống cho hết đời thanh xuân 1",
            single: "Dick-Xám-Tuyết",
            path: "Music/SCHDTX1/SỐNG CHO HẾT ĐỜI THANH XUÂN 1.mp3",
            image: "Music/SCHDTX1/SCHDTX1.jpg"
        },
        {
            name: "Sống cho hết đời thanh xuân 2",
            single: "BCTM",
            path: "Music/SCHDTX2/SỐNG CHO HẾT ĐỜI THANH XUÂN 2  BCTM x TNS   Official Music Video .mp3",
            image: "Music/SCHDTX2/maxresdefault.jpg"
        },
        {
            name: "Sống cho hết đời thanh xuân 3",
            single: "BCTM",
            path: "Music/SCHDTX3/y2mate.com - SỐNG CHO HẾT ĐỜI THANH XUÂN 3  BCTM x TNS  Official Music Video  Prod HPro.mp3",
            image: "Music/SCHDTX3/maxresdefault (1).jpg"
        },
        {
            name: "Trước khi tuổi trẻ này đóng lối",
            single: "Ngắn-Xám-Dick",
            path: "Music/TRƯỚC KHI TUỔI TRẺ NÀY ĐÓNG LỐI/y2mate.com - TRƯỚC KHI TUỔI TRẺ NÀY ĐÓNG LỐI  Ngắn x Xám x Dick  Đà Lạt Ep3  Directed by Nguyễn Nhật Trung .mp3",
            image: "Music/TRƯỚC KHI TUỔI TRẺ NÀY ĐÓNG LỐI/maxresdefault.jpg"
        },
        {
            name: "Anh nhớ ra rằng",
            single: "Vũ",
            path: "Music/Anh nhớ ra rằng Vũ/y2mate.com - ANH NHỚ RA  Vũ Feat Trang  Official Audio.mp3",
            image: "Music/Anh nhớ ra rằng Vũ/maxresdefault (1).jpg"
        },
        {
            name: "Sống cho hết đời thanh xuân 1",
            single: "Dick-Xám-Tuyết",
            path: "Music/SCHDTX1/SỐNG CHO HẾT ĐỜI THANH XUÂN 1.mp3",
            image: "Music/SCHDTX1/SCHDTX1.jpg"
        },
        {
            name: "Sống cho hết đời thanh xuân 2",
            single: "BCTM",
            path: "Music/SCHDTX2/SỐNG CHO HẾT ĐỜI THANH XUÂN 2  BCTM x TNS   Official Music Video .mp3",
            image: "Music/SCHDTX2/maxresdefault.jpg"
        },
        {
            name: "Sống cho hết đời thanh xuân 3",
            single: "BCTM",
            path: "Music/SCHDTX3/y2mate.com - SỐNG CHO HẾT ĐỜI THANH XUÂN 3  BCTM x TNS  Official Music Video  Prod HPro.mp3",
            image: "Music/SCHDTX3/maxresdefault (1).jpg"
        },
        {
            name: "Trước khi tuổi trẻ này đóng lối",
            single: "Ngắn-Xám-Dick",
            path: "Music/TRƯỚC KHI TUỔI TRẺ NÀY ĐÓNG LỐI/y2mate.com - TRƯỚC KHI TUỔI TRẺ NÀY ĐÓNG LỐI  Ngắn x Xám x Dick  Đà Lạt Ep3  Directed by Nguyễn Nhật Trung .mp3",
            image: "Music/TRƯỚC KHI TUỔI TRẺ NÀY ĐÓNG LỐI/maxresdefault.jpg"
        },
        {
            name: "Anh nhớ ra rằng",
            single: "Vũ",
            path: "Music/Anh nhớ ra rằng Vũ/y2mate.com - ANH NHỚ RA  Vũ Feat Trang  Official Audio.mp3",
            image: "Music/Anh nhớ ra rằng Vũ/maxresdefault (1).jpg"
        },
    ],
    render: function(){
        const htmls = this.songs.map((song, index) =>{
            return `
            <div class="song ${
                index === this.currentIndex ? "active" : ""
              }" data-index="${index}">
                    <div class="thumb"
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.single}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        });
        playlist.innerHTML = htmls.join('')
    },

    defineProperties: function () {
        Object.defineProperty(app, "currentSong", {
        get: function () {
            return app.songs[app.currentIndex];
            }
        });
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    
    handleEvents: function(){
        repeatBtn.classList.remove('active')
        randomBtn.classList.remove('active')
    // Handle the cd size when scroll
        const _this = this;
        const cdWidth = cd.offsetWidth;
    // Xử lý cd quay/dừng theo tiến độ
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ],{
            duration: 10000, // 10sec
            iteration: Infinity
        })
        cdThumbAnimate.pause()
    // Xử lý phóng to/ thu nhỏ cd khi scroll
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newcdWidth = cdWidth - scrollTop;
            cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0;
            cd.style.opacity = (newcdWidth / cdWidth) > 0 ? (newcdWidth / cdWidth) : 0;
        }
    //Handle play Btn
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause();
            }
            else{
                audio.play();
            } 
        }
    // Khi song duoc Play
        audio.onplay = function(){
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
    // Khi song bi pause
        audio.onpause = function(){
            _this.isPlaying = false;
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
    // Khi tien do bai hat thay doi
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
            // console.log(audio.currentTime / audio.duration * 100)
        }
    // Xu li khi tua song
        progress.onchange = function(){
            // console.log(progress.value)
            const seekTime = audio.duration  * progress.value / 100;
            audio.currentTime = seekTime;
            console.log(seekTime)
        }
    // TODO fix bug khi bấm nhanh sẽ lỗi ở progress bar
        /** 
         * 
        */
    // khi next song
        nextBtn.onclick = function(){
            if (randomBtn.classList.contains('active')){
                _this.playRandomSong()
            }else{
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrolltoActiveSong()
        }
    // khi an pre song
        prevBtn.onclick = function(){
            if (randomBtn.classList.contains('active')){
                _this.playRandomSong()
            }else{
                _this.preSong()
            }
            audio.play()
            audio.render()
            _this.scrolltoActiveSong()
        }
    // random button-------------Kien thuc kho--------------------
        // randomBtn.onclick = function(){
        //     _this.isRandom = !_this.isRandom
        //     randomBtn.classList.toggle('active', _this.isRandom)
        // }
        
        randomBtn.onclick = function() {
            
            if(randomBtn.classList.contains('active')){
                randomBtn.classList.remove('active');
            }
            else{
                randomBtn.classList.add('active');
            }
            
        }
    //-----------------------------------------------------
        //khi audio end and move to next
        
        //repeat btn
        
        repeatBtn.onclick = function(){
            
            if(this.classList.contains('active')){
                this.classList.remove('active')
            } else{
                this.classList.add('active')
            }
        }
        audio.onended = function(){
            if(repeatBtn.classList.contains('active')){
                audio.play();
            } else{
                nextBtn.click();
            }
            
        }
        // handle click in playlist
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')
            if(e.target.closest('.song:not(.active)') || e.target.closest('.option')){
                // Xu ly click vao song
                if(songNode){
                    _this.currentIndex= Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
                if(e.target.closest('.option')){

                }
            }
        }
        

    },
    //Next Song
    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex>= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },
    // previous song
    preSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    //Play random song
    playRandomSong: function(){
        let newIndex;
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex;
        console.log(newIndex)
        this.loadCurrentSong()
    },
    scrolltoActiveSong: function(){
        setTimeout(() =>{
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 300)
    },
    

    start: function(){

        // Định nghĩa các thuộc tính cho object
        this.defineProperties();
        
        // Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents();

        // Load current song to UI when start application
        this.loadCurrentSong();

        // Render playlist
        this.render();
    },
}

app.start()