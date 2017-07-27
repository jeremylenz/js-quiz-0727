// make a form that creates a musical instrument
// associates the musical instrument with the category
// category names should be unique
// should be able to associate multiple instruments with the same category

// 1. create classes/models
// 2. create associations  (store)
// 3. make it work
const store = {instruments: [], categories: []}


$(function() {
  $(document).on('click', '#submit', function(event) {
    let instName = $('#instrument-name').val()
    let catName = $('#category-name').val()
    $('#instrument-name').val("")
    $('#category-name').val("")
    new Instrument(instName, Category.findOrCreateBy(catName))
    displayCategories()
    event.preventDefault();
  })
})

function createInstrument () {
  let nextID = 0
  return class {
    constructor(name, category) {
      this.name = name;
      this.id = ++nextID;
      this.category = category
      store.instruments.push(this);
    }


  }
}

function createCategory () {
  let nextID = 0
  return class {
    constructor(name) {
      this.name = name;
      this.id = ++nextID;
      store.categories.push(this);
    }

    instruments() {
      return store.instruments.filter((inst) => {
        return inst.category === this
      })
    }

    static findOrCreateBy(categoryName) {
      let result = store.categories.find((category) => {
        return category.name == categoryName.toLowerCase();
      })
      if(result == null) {
        return new Category(categoryName.toLowerCase());
      } else {
        return result
      }
    }
  }
}

var Instrument = createInstrument()
var Category = createCategory()

function displayCategories () {
  $('#cats').empty()
  store.categories.forEach((category) => {
    displayCategory(category)
  })
}

function displayCategory(category) {
  let catHTML = `<h2>${category.name}<h2>
    <ul id="${category.name}">
      `
    let insts = category.instruments()
    insts.forEach((instrument) => {
      catHTML += instrumentHTML(instrument)
    })
    catHTML += "</ul>"
    render(catHTML, "#cats")
}

function instrumentHTML(inst) {
  return `<li>${inst.name}</li>`
}

function render(html, where) {
  $(html).appendTo(where);
}
