// We enclose this in window.onload.
// So we don't have ridiculous errors.
window.onload = function() {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAc20FSPvx61kEeh0nGIogwtPrYeGlZjjA",
  authDomain: "gc-anonymous-warperofficial.firebaseapp.com",
  projectId: "gc-anonymous-warperofficial",
  storageBucket: "gc-anonymous-warperofficial.appspot.com",
  messagingSenderId: "642655368722",
  appId: "1:642655368722:web:fa6022e87de988cb7e4acb"
};
  // Inisialisasi Firebase
  firebase.initializeApp(firebaseConfig);
  // Ini sangat PENTING!! Kita akan sering menggunakan "db".
  var db = firebase.database()
  // Kita akan menggunakan Pemrograman Berorientasi Objek. Haha
  class GC_ANONYMOUS_WARPEROFFICIAL {
    // home() digunakan untuk membuat halaman utama
    home(){
      // Pertama-tama hapus isi body sebelum menambahkan
      // judul dan formulir bergabung
      document.body.innerHTML = ''
      this.create_title()
      this.create_join_form()
    }
    // chat() digunakan untuk membuat halaman obrolan
    chat(){
      this.create_title()
      this.create_chat()
    }
    // create_title() digunakan untuk membuat judul
    create_title(){
      // Ini adalah pembuat judul. 🎉
      var title_container = document.createElement('div')
      title_container.setAttribute('id', 'title_container')
      var title_inner_container = document.createElement('div')
      title_inner_container.setAttribute('id', 'title_inner_container')

      var title = document.createElement('h1')
      title.setAttribute('id', 'title')
      title.textContent = 'gc anonymous warperofficial'

      title_inner_container.append(title)
      title_container.append(title_inner_container)
      document.body.append(title_container)
    }
    // create_join_form() membuat formulir bergabung
    create_join_form(){
      // ANDA HARUS MEMILIKI (PARENT = THIS). ATAU TIDAK, TIDAK MASALAH. SAYA BUKAN BOS ANDA!😂
      var parent = this;

      var join_container = document.createElement('div')
      join_container.setAttribute('id', 'join_container')
      var join_inner_container = document.createElement('div')
      join_inner_container.setAttribute('id', 'join_inner_container')

      var join_button_container = document.createElement('div')
      join_button_container.setAttribute('id', 'join_button_container')

      var join_button = document.createElement('button')
      join_button.setAttribute('id', 'join_button')
      join_button.innerHTML = 'Gabung <i class="fas fa-sign-in-alt"></i>'

      var join_input_container = document.createElement('div')
      join_input_container.setAttribute('id', 'join_input_container')

      var join_input = document.createElement('input')
      join_input.setAttribute('id', 'join_input')
      join_input.setAttribute('maxlength', 15)
      join_input.placeholder = 'Tidak.... Ini Patrick Star'
      // Setiap kali kita mengetik di dalam join_input
      join_input.onkeyup  = function(){
        // Jika panjang input lebih dari 0 karakter
        if(join_input.value.length > 0){
          // Nyalakan tombol
          join_button.classList.add('enabled')
          // Izinkan pengguna mengklik tombol
          join_button.onclick = function(){
            // Simpan nama ke local storage. Memasukkan
            // nilai join_input.value
            parent.save_name(join_input.value)
            // Hapus join_container. Agar tampilan situs tidak aneh.
            join_container.remove()
            // parent = this. Tapi ini bukan tombol gabung
            // Ini (MEME_CHAT = this).
            parent.create_chat()
          }
        }else{
          // Jika join_input kosong, matikan tombol
          join_button.classList.remove('enabled')
        }
      }

      // Tambahkan semuanya ke dalam body
      join_button_container.append(join_button)
      join_input_container.append(join_input)
      join_inner_container.append(join_input_container, join_button_container)
      join_container.append(join_inner_container)
      document.body.append(join_container)
    }
    // create_load() membuat lingkaran pemuatan yang digunakan di dalam kontainer obrolan
    create_load(container_id){
      // ANDA JUGA HARUS MEMILIKI (PARENT = THIS). TAPI ITU TIDAK MASALAH.
      var parent = this;

      // Ini adalah fungsi pemuatan. Sesuatu yang keren untuk dimiliki.
      var container = document.getElementById(container_id)
      container.innerHTML = ''

      var loader_container = document.createElement('div')
      loader_container.setAttribute('class', 'loader_container')

      var loader = document.createElement('div')
      loader.setAttribute('class', 'loader')

      loader_container.append(loader)
      container.append(loader_container)
    }

    // create_chat() membuat kontainer obrolan dan sebagainya
    create_chat(){
      // Sekali lagi! Anda harus memiliki (parent = this)
      var parent = this;
      // HAPUS HEADER MEMECHAT ITU DARI SINI
      var title_container = document.getElementById('title_container')
      var title = document.getElementById('title')
      title_container.classList.add('chat_title_container')
      // Buat judul lebih kecil dengan menambahkan kelas 'chat_title'
      title.classList.add('chat_title')

      var chat_container = document.createElement('div')
      chat_container.setAttribute('id', 'chat_container')

      var chat_inner_container = document.createElement('div')
      chat_inner_container.setAttribute('id', 'chat_inner_container')

      var chat_content_container = document.createElement('div')
      chat_content_container.setAttribute('id', 'chat_content_container')

      var chat_input_container = document.createElement('div')
      chat_input_container.setAttribute('id', 'chat_input_container')

      var chat_input_send = document.createElement('button')
      chat_input_send.setAttribute('id', 'chat_input_send')
      chat_input_send.setAttribute('disabled', true)
      chat_input_send.innerHTML = `<i class="far fa-paper-plane"></i>`

      var chat_input = document.createElement('input')
      chat_input.setAttribute('id', 'chat_input')
      // Hanya panjang pesan maksimum 1000 karakter
      chat_input.setAttribute('maxlength', 1000)
      // Dapatkan nama pengguna
      chat_input.placeholder = `${parent.get_name()}. Katakan sesuatu...`
      chat_input.onkeyup  = function(){
        if(chat_input.value.length > 0){
          chat_input_send.removeAttribute('disabled')
          chat_input_send.classList.add('enabled')
          chat_input_send.onclick = function(){
            chat_input_send.setAttribute('disabled', true)
            chat_input_send.classList.remove('enabled')
            if(chat_input.value.length <= 0){
              return
            }
            // Aktifkan lingkaran pemuatan di dalam 'chat_content_container'
            parent.create_load('chat_content_container')
            // Kirim pesan. Memasukkan nilai chat_input.value
            parent.send_message(chat_input.value)
            // Bersihkan kotak masukan obrolan
            chat_input.value = ''
            // Fokus pada input setelahnya
            chat_input.focus()
          }
        }else{
          chat_input_send.classList.remove('enabled')
        }
      }

      var chat_logout_container = document.createElement('div')
      chat_logout_container.setAttribute('id', 'chat_logout_container')

      var chat_logout = document.createElement('button')
      chat_logout.setAttribute('id', 'chat_logout')
      chat_logout.textContent = `${parent.get_name()} • logout`
      // "Logout" sebenarnya hanya menghapus nama dari localStorage
      chat_logout.onclick = function(){
        localStorage.clear()
        // Kembali ke halaman utama
        parent.home()
      }

      chat_logout_container.append(chat_logout)
      chat_input_container.append(chat_input, chat_input_send)
      chat_inner_container.append(chat_content_container, chat_input_container, chat_logout_container)
      chat_container.append(chat_inner_container)
      document.body.append(chat_container)
      // Setelah membuat obrolan. Kita segera membuat lingkaran pemuatan di dalam 'chat_content_container'
      parent.create_load('chat_content_container')
      // lalu kita "refresh" dan mendapatkan data obrolan dari Firebase
      parent.refresh_chat()
    }
    // Simpan nama. Ini benar-benar menyimpan nama ke localStorage
    save_name(name){
      // Simpan nama ke localStorage
      localStorage.setItem('name', name)
    }
    // Kirim pesan/menyimpan pesan ke database firebase
    send_message(message){
      var parent = this
      // jika nama di local storage kosong dan tidak ada pesan
      // maka kembalikan/tidak kirim pesan. Pengguna somehow hacking
      // untuk mengirim pesan. Atau mereka baru saja menghapus
      // localstorage sendiri. Tapi hacking kedengarannya lebih keren!!
      if(parent.get_name() == null && message == null){
        return
      }

      // Dapatkan nilai database firebase
      db.ref('chats/').once('value', function(message_object) {
        // Indeks ini penting. Ini akan membantu mengatur obrolan secara berurutan
        var index = parseFloat(message_object.numChildren()) + 1
        db.ref('chats/' + `message_${index}`).set({
          name: parent.get_name(),
          message: message,
          index: index
        })
        .then(function(){
          // Setelah kita mengirim pesan, perbarui untuk mendapatkan pesan baru
          parent.refresh_chat()
        })
      })
    }
    // Dapatkan nama. Mendapatkan nama pengguna dari localStorage
    get_name(){
      // Dapatkan nama dari localstorage
      if(localStorage.getItem('name') != null){
        return localStorage.getItem('name')
      }else{
        this.home()
        return null
      }
    }
    // Perbarui obrolan, dapatkan data pesan dari firebase
    refresh_chat(){
      var chat_content_container = document.getElementById('chat_content_container')

      // Dapatkan obrolan dari firebase
      db.ref('chats/').on('value', function(messages_object) {
        // Ketika kami mendapatkan data, hapus isi chat_content_container
        chat_content_container.innerHTML = ''
        // jika tidak ada pesan dalam obrolan, kembalikan. Jangan tampilkan apa-apa
        if(messages_object.numChildren() == 0){
          return
        }

        // OKE! JADI JIKA ANDA PEMULA DALAM KODING, INI AKAN AGAK MUDAH! KIRA-KIRA!
        // Ubah nilai objek pesan menjadi array.
        var messages = Object.values(messages_object.val());
        var guide = [] // ini akan menjadi panduan kita untuk mengatur pesan
        var unordered = [] // pesan tanpa urutan
        var ordered = [] // kita akan mengurutkan pesan-pesan ini

        for (var i, i = 0; i < messages.length; i++) {
          // Panduan ini hanya berupa array dari 0 hingga panjang pesan
          guide.push(i+1)
          // unordered adalah [pesan, indeks_pesan]
          unordered.push([messages[i], messages[i].index]);
        }

        // Sekarang ini langsung dari stack overflow 🤣
        // Urutkan pesan-pesan yang tidak berurutan berdasarkan panduan
        guide.forEach(function(key) {
          var found = false
          unordered = unordered.filter(function(item) {
            if(!found && item[1] == key) {
              // Sekarang masukkan pesan-pesan yang telah diurutkan ke dalam array ordered
              ordered.push(item[0])
              found = true
              return false
            }else{
              return true
            }
          })
        })

        // Sekarang kita selesai. Hanya tampilkan pesan-pesan yang telah diurutkan
        ordered.forEach(function(data) {
          var name = data.name
          var message = data.message

          var message_container = document.createElement('div')
          message_container.setAttribute('class', 'message_container')

          var message_inner_container = document.createElement('div')
          message_inner_container.setAttribute('class', 'message_inner_container')

          var message_user_container = document.createElement('div')
          message_user_container.setAttribute('class', 'message_user_container')

          var message_user = document.createElement('p')
          message_user.setAttribute('class', 'message_user')
          message_user.textContent = `${name}`

          var message_content_container = document.createElement('div')
          message_content_container.setAttribute('class', 'message_content_container')

          var message_content = document.createElement('p')
          message_content.setAttribute('class', 'message_content')
          message_content.textContent = `${message}`

          message_user_container.append(message_user)
          message_content_container.append(message_content)
          message_inner_container.append(message_user_container, message_content_container)
          message_container.append(message_inner_container)

          chat_content_container.append(message_container)
        });
        // Pergi ke pesan terbaru di bagian bawah kontainer
        chat_content_container.scrollTop = chat_content_container.scrollHeight;
      })
    }
  }
  // Jadi kita telah "membangun" aplikasi kita. Mari buat aplikasinya berfungsi!!
  var app = new GC_ANONYMOUS_WARPEROFFICIAL()
  // Jika kita memiliki nama yang disimpan di localStorage.
  // Maka gunakan nama tersebut. Jika tidak, jika tidak.
  // Kembali ke halaman utama.
  if(app.get_name() != null){
    app.chat()
  }
}
