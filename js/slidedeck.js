class SlideDeck {

  constructor(container, slides, map, slideOptions = {}) {
    this.container = container;
    this.slides = slides;
    this.map = map;
    this.slideOptions = slideOptions;

    this.dataLayer = L.layerGroup().addTo(map);
    this.currentSlideIndex = 0;
  }


  updateDataLayer(data, options) {
    this.dataLayer.clearLayers();

    const defaultOptions = {
      pointToLayer: (p, latlng) => L.marker(latlng),
      style: (feature) => feature.properties.style,
      onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.label) {
          layer.bindTooltip(feature.properties.label);
        }
      }
    };
    const geoJsonLayer = L.geoJSON(data, options || defaultOptions)
        .addTo(this.dataLayer);

    return geoJsonLayer;
  }s
  
  async getSlideFeatureCollection(slide) {
    const resp = await fetch(`data/${slide.id}.geojson`);
    const data = await resp.json();
    return data;
  }
  
  /**
   * ### hideAllSlides
   *
   * Add the hidden class to all slides' HTML elements.
   *
   * @param {NodeList} slides The set of all slide elements, in order.
   */
  hideAllSlides() {
    for (const slide of this.slides) {
      slide.classList.add('hidden');
    }
  }

  /**
   * ### syncMapToSlide
   *
   * Go to the slide that mathces the specified ID.
   *
   * @param {HTMLElement} slide The slide's HTML element
   */
  async syncMapToSlide(slide) {
    const collection = await this.getSlideFeatureCollection(slide);
    const options = this.slideOptions[slide.id];
    const layer = this.updateDataLayer(collection, options);

    /**
     * Create a bounds object from a GeoJSON bbox array.
     * @param {Array} bbox The bounding box of the collection
     * @return {L.latLngBounds} The bounds object
     */
    const boundsFromBbox = (bbox) => {
      const [west, south, east, north] = bbox;
      const bounds = L.latLngBounds(
          L.latLng(south, west),
          L.latLng(north, east),
      );
      return bounds;
    };

    /**
     * Create a temporary event handler that will show tooltips on the map
     * features, after the map is done "flying" to contain the data layer.
     */
    const handleFlyEnd = () => {
      if (slide.showpopups) {
        layer.eachLayer((l) => {
          l.bindTooltip(l.feature.properties.label, { permanent: true });
          l.openTooltip();
        });
      }
      this.map.removeEventListener('moveend', handleFlyEnd);
    };

    this.map.addEventListener('moveend', handleFlyEnd);
    
  

if (isMobile) {
  const padFactor = 0.2;
  const south = bounds.getSouth() + (bounds.getNorth() - bounds.getSouth()) * padFactor;
  bounds = L.latLngBounds([south, bounds.getWest()], [bounds.getNorth(), bounds.getEast()]);
  this.map.flyToBounds(bounds);
} else {
    if (options.mapView) {
    const { center, zoom } = options.mapView;
    this.map.setView(center, zoom);
  } else if (collection.bbox) {
    this.map.flyToBounds(boundsFromBbox(collection.bbox));
  } else {
    this.map.flyToBounds(layer.getBounds());
  }
}
}

  /**
   * Show the slide with ID matched by currentSlideIndex. If currentSlideIndex is
   * null, then show the first slide.
   */
  syncMapToCurrentSlide() {
    const slide = this.slides[this.currentSlideIndex];
    this.syncMapToSlide(slide);
  }

  /**
   * Increment the currentSlideIndex and show the corresponding slide. If the
   * current slide is the final slide, then the next is the first.
   */
  goNextSlide() {
    this.currentSlideIndex++;

    if (this.currentSlideIndex === this.slides.length) {
      this.currentSlideIndex = 0;
    }

    this.syncMapToCurrentSlide();
  }

  /**
   * Decrement the currentSlideIndes and show the corresponding slide. If the
   * current slide is the first slide, then the previous is the final.
   */
  goPrevSlide() {
    this.currentSlideIndex--;

    if (this.currentSlideIndex < 0) {
      this.currentSlideIndex = this.slides.length - 1;
    }

    this.syncMapToCurrentSlide();
  }

  /**
   * ### preloadFeatureCollections
   *
   * Initiate a fetch on all slide data so that the browser can cache the
   * requests. This way, when a specific slide is loaded it has a better chance
   * of loading quickly.
   */
  preloadFeatureCollections() {
    for (const slide of this.slides) {
      this.getSlideFeatureCollection(slide);
    }
  }

  /**
   * Calculate the current slide index based on the current scroll position.
   */
  calcCurrentSlideIndex() {
    const scrollPos = window.scrollY - this.container.offsetTop;
    const windowHeight = window.innerHeight;

    let i;
    for (i = 0; i < this.slides.length; i++) {
      const slidePos =
        this.slides[i].offsetTop - scrollPos + windowHeight * 0.7;
      if (slidePos >= 0) {
        break;
      }
    }

    if (i !== this.currentSlideIndex) {
      this.currentSlideIndex = i;
      this.syncMapToCurrentSlide();
    }
  }
}

export { SlideDeck };
