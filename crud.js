class CRUD {
        constructor(props) {
            this.users = [
                {id: 1, name: 'riyan'},
                {id: 2, name: 'satria'},
                {id: 3, name: 'adi'},
                {id: 4, name: 'tama'},
            ]

            // init read data
            this.read()

            // binding form
            document.querySelector('#formNew').addEventListener('submit', function(e) {
                app.store()
                e.preventDefault()
            })
            document.querySelector('#formEdit').addEventListener('submit', function(e) {
                app.put()
                e.preventDefault()
            })
        }
        // get user data from id
        // usage : this.getData('1', 'nama')
        getData(id, props) {
            let ret
            this.users.forEach(res => {
                if(res.id == id) {
                    ret = res[props]
                }
            })
            return ret
        }
        read() {
            let load = document.querySelector("#load")
            load.innerHTML = ''

            let i = 0
            this.users.forEach(res => {
                let ii = i++
                
                // create tr of table
                this.createElement({
                    el: 'tr',
                    createTo: '#load',
                    attribute: [
                        ['id', 'data'+ii],
                    ]
                })

                // create name column
                this.createElement({
                    el: 'td',
                    createTo: '#data' + ii,
                    attribute: [],
                    html: res.name
                })

                // create button column
                this.createElement({
                    el: 'td',
                    createTo: '#data' + ii,
                    attribute: [
                        ['id', 'btn'+ii]
                    ],
                })
                
                // create delete button
                this.createElement({
                    el: 'button',
                    createTo: '#btn' + ii,
                    attribute: [
                        ['onclick', 'app.hapus(' + res.id + ')']
                    ],
                    html: 'x'
                })

                // create edit button
                this.createElement({
                    el: 'button',
                    createTo: '#btn' + ii,
                    attribute: [
                        ['onclick', 'app.edit(' + res.id + ')']
                    ],
                    html: 'edit'
                })
            })
        }
        store() {
            // hide edit form
            this.hide('#formEdit')

            // handling data request
            let name = this.select('#nama')
            let id = this.users.length + 1
            
            // save to store
            this.users.push({
                id: id,
                name: name.value
            })
            
            // reload data
            this.read()
            name.value = ''

            // hide form
            this.hide('#formNew')
        }
        create() {
            this.show('#formNew')
        }
        edit(id) {
            // hide create form
            this.hide('#formNew')

            // get user information
            let name = this.getData(id, 'name')
            
            // pass user info to input
            this.select('#namaEdit').value = name
            this.select('#iduser').value = id
            this.select('#namaEdit').focus()

            // display edit form
            this.show('#formEdit')
        }
        put() {
            // handling data request
            let id = this.select('#iduser').value
            let name = this.select('#namaEdit').value

            this.users.forEach(res => {
                // if id of user looped data and id from request are same
                if(res.id == id) {
                    // then change property 'name' to value of 'name' variable
                    res.name = name
                }
            })

            // reload data
            this.read()
            // hide edit form
            this.hide('#formEdit')
        }
        hapus(id) {
            let i = 0
            this.users.forEach(user => {
                let ii = i++
                // if id of user looped data and id from parameter are same
                if(user.id === id) {
                    // remove data based on index (ii variable)
                    // and length 1 (which declared on second parameter)
                    this.users.splice(ii, 1)

                    // so if you change '1' on second parameter to be '2', 2 users will deleted
                }
            })

            // reload data
            this.read()
        }

        hide(el) {
            // hiding element
            this.select(el).style.display = 'none'
        }
        show(el) {
            // showing element
            this.select(el).style.display = 'block'
        }
        select(el) {
            // selecting current dom
            let dom = document.querySelector(el)
            return dom
        }
        createElement(props) {
            // init element
            let el = document.createElement(props.el)
            props.attribute.forEach(res => {
                el.setAttribute(res[0], res[1])
            })
            
            // create value
            // if html property is setted
            if(props.html !== undefined) {
                // create span element
                let val = document.createElement('span')
                val.innerHTML = props.html

                // to append to initiated element before
                el.appendChild(val)
            }
            
            // append initiated element to 'createTo' property dom
            document.querySelector(props.createTo).appendChild(el)  
        }
    }

    let app = new CRUD()