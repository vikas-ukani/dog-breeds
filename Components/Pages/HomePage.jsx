import axios from "axios"
import DogsImages from "Components/ImageGrid/DogsImages"
import Loader from "Components/Layout/Loader"
import { API_URL } from "libs/utils"
import { useEffect, useState } from "react"
import ReactSelect from "react-select"

const HomePage = () => {

  const [breeds, setBreeds] = useState([])
  const [subBreeds, setSubBreeds] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])

  const [filter, setFilter] = useState({
    selectedBreed: null,
    selectedSubBreed: null,
    numberOfImages: null,
  })

  /** Fetch Breed on Load */
  useEffect(() => {
    fetchBreeds()
  }, [])


  /**
   * Breed Options
   * @returns 
   */
  const breedOptions = () => {
    if (breeds) {
      let allBreeds = Object.keys(breeds)
      return allBreeds?.map(breed => { return { value: breed, label: breed, subBreeds: breeds[breed] } })
    }
  }

  /**
   * Make Sub Breed Options
   * @returns 
   */
  const subBreedOptions = () => {
    if (subBreeds.length) {
      return subBreeds?.map(breed => { return { value: breed, label: breed, subBreeds: breeds[breed] } })
    }
  }

  /**
   * Handle Breed Change event
   * @param {*} selected 
   */
  const handleBreedChange = (selected) => {
    if (selected) {
      setFilter(prev => {
        return { ...prev, selectedBreed: selected.value, selectedSubBreed: null }
      })
      setSubBreeds(selected.subBreeds)
    }
  }

  /**
   * Handling Sub Breed dropdown change
   * @param {*} selected 
   */
  const handleSubBreedChange = (selected) => {
    if (selected) {
      setFilter(prev => {
        return { ...prev, selectedSubBreed: selected.value }
      })
    }
  }

  /**
   * Fetching all breeds
   */
  const fetchBreeds = () => {
    axios.get(`${API_URL}/breeds/list/all`).then(res => {
      if (res.data) {
        setBreeds(res.data.message)
      }
    })
  }


  const fetchImages = () => {
    if (filter.selectedBreed == null) {
      setError('Please selecte breed first.')
      return false
    } else if (subBreeds?.length > 0 && filter.selectedSubBreed == null) {
      setError('Please selecte sub breed first.')
      return false
    } else if (filter.numberOfImages == null) {
      setError('Please selecte number of images.')
      return false
    } else {
      setError(null)
      setLoading(true)
      let url = `${API_URL}/breed/${filter.selectedBreed}`
      if (filter.selectedSubBreed) url = `${url}/${filter.selectedSubBreed}`
      url = `${url}/images/random/${filter.numberOfImages}`

      axios.get(url).then(res => {
        if (res.data.message) setImages(res.data.message)
        else setImages([])
      }).finally(() => {
        setLoading(false)
      })
    }
  }

  return (
    <div className="px-10 mx-auto">

      {error &&
        <div className="bg-red-500 h-8 w-full my-8 py-5 md:mb-0 rounded-md flex items-center pl-5">
          <div className="flex items-center ">
            <div className="h-1 w-1 rounded-full bg-black mr-1" />
            <span className="text-lg text-white font-normal "><strong>ERROR:</strong> {error}</span>
          </div>
        </div>
      }

      <div className="pt-5">
        <div className="grid grid-cols-4 pt-5 gap-4 bg-white p-4 rounded-xl shadow-lg rounded-t-none border-2">
          <div className="rounded " >
            <label htmlFor="breed">Select Breed</label>
            <ReactSelect
              id="breed"
              instanceId="breed"
              name="breed"
              defaultValue={filter.selectedBreed}
              onChange={handleBreedChange}
              options={breedOptions()}
            />
          </div>
          {subBreeds?.length > 0 && (
            <div className="rounded duration-200 " >
              <label htmlFor="subBreed">Select Sub Breed</label>
              <ReactSelect
                id="subBreed"
                instanceId="subBreed"
                name="subBreed"
                defaultValue={filter.selectedSubBreed}
                onChange={handleSubBreedChange}
                options={subBreedOptions()}
              />
            </div>
          )}
          <div className="rounded " >
            <label htmlFor="numberOfImages">Number of Images</label>
            <ReactSelect
              id="numberOfImages"
              instanceId="numberOfImages"
              name="numberOfImages"
              defaultValue={filter.numberOfImages}
              onChange={select => setFilter({ ...filter, numberOfImages: select.value })}
              options={[1, 3, 5, 10, 20].map((el, i) => { return { value: el.toString(), label: el } })}
            />
          </div>

          <button role="button" className="focus:ring-indigo-700 text-sm font-semibold  text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 w-full mt-4"
            onClick={fetchImages}>
            View Images
          </button>

        </div>

        {loading ? <Loader /> : <>{images.length > 0 && <DogsImages images={images} />}</>}
      </div>

    </div>
  );
}

export default HomePage;