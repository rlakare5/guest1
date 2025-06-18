import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    city: '',
    state: '',
    male: '',
    female: '',
    children: '',
    restaurant: '',
    timeSlots: '',
    name: '',
    mobile: '',
    email: '',
    bookingDate: ''
  })

  const [showPopup, setShowPopup] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate required fields
    const requiredFields = ['name', 'mobile', 'email', 'bookingDate']
    const missingFields = requiredFields.filter(field => !formData[field])
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`)
      return
    }
    
    // Show popup with form data
    setShowPopup(true)
  }

  const handleConfirm = () => {
    // Update time slot to next hour
    const updatedFormData = { ...formData }
    if (formData.timeSlots) {
      updatedFormData.timeSlots = getNextTimeSlot(formData.timeSlots)
    }
    
    // Store booking data in localStorage for the confirmation page
    localStorage.setItem('bookingData', JSON.stringify(updatedFormData))
    
    console.log('Booking confirmed:', updatedFormData)
    setShowPopup(false)
    
    // Redirect to confirmation page
    window.location.href = '/confirmation.html'
  }

  const getNextTimeSlot = (currentSlot) => {
    const timeSlotOptions = [
      '7:30pm to 8pm', '8pm to 8:30pm', '8pm to 9pm', '9pm to 9:30pm',
      '9:30pm to 10pm', '10pm - 10:30pm', '10:30pm - 11:00pm'
    ]
    
    const currentIndex = timeSlotOptions.indexOf(currentSlot)
    if (currentIndex !== -1 && currentIndex < timeSlotOptions.length - 1) {
      return timeSlotOptions[currentIndex + 1]
    }
    return currentSlot // Return the same slot if it's the last one
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  const stateOptions = [
    'Maharashtra', 'Goa', 'Tamilnadu', 'Madhya Pradesh', 'Gujarat', 
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 
    'Karnataka', 'Kerala', 'Manipur', 'Mizoram'
  ]

  const timeSlotOptions = [
    '7:30pm to 8pm', '8pm to 8:30pm', '8pm to 9pm', '9pm to 9:30pm',
    '9:30pm to 10pm', '10pm - 10:30pm', '10:30pm - 11:00pm'
  ]

  const restaurantOptions = [
    'The Grand Palace', 'Ocean View Restaurant', 'Mountain Peak Dining',
    'City Lights Bistro', 'Garden Terrace', 'Sunset Grill'
  ]

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon"></div>
          </div>
          <div className="nav-menu">
            <a href="#" className="nav-item">Our Team</a>
            <a href="#" className="nav-item">Event Details</a>
            <a href="#" className="nav-item">Corporate Booking</a>
            <a href="#" className="nav-item">Career</a>
            <a href="#" className="nav-item">Our Policy</a>
            <a href="#" className="nav-item">Clubs</a>
            <a href="#" className="nav-item">Dinings</a>
            <a href="#" className="nav-item">About</a>
            <a href="#" className="nav-item">Contact Us</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="booking-container">
          <h1 className="booking-title">BOOK YOUR GUEST-LIST</h1>
          
          <form onSubmit={handleSubmit} className="booking-form">
            {/* First Row */}
            <div className="form-row">
              <div className="form-field">
                <div className="field-icon building-icon"></div>
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-field">
                <div className="field-icon location-icon"></div>
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="form-input"
                >
                  <option value="">State</option>
                  {stateOptions.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <div className="field-icon male-icon"></div>
                <input
                  type="number"
                  placeholder="Male"
                  value={formData.male}
                  onChange={(e) => handleInputChange('male', e.target.value)}
                  className="form-input"
                  min="0"
                />
              </div>
              <div className="form-field">
                <div className="field-icon female-icon"></div>
                <input
                  type="number"
                  placeholder="Female"
                  value={formData.female}
                  onChange={(e) => handleInputChange('female', e.target.value)}
                  className="form-input"
                  min="0"
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="form-row">
              <div className="form-field">
                <div className="field-icon children-icon"></div>
                <input
                  type="number"
                  placeholder="Children"
                  value={formData.children}
                  onChange={(e) => handleInputChange('children', e.target.value)}
                  className="form-input"
                  min="0"
                />
              </div>
              <div className="form-field">
                <div className="field-icon restaurant-icon"></div>
                <select
                  value={formData.restaurant}
                  onChange={(e) => handleInputChange('restaurant', e.target.value)}
                  className="form-input"
                >
                  <option value="">Restaurant</option>
                  {restaurantOptions.map(restaurant => (
                    <option key={restaurant} value={restaurant}>{restaurant}</option>
                  ))}
                </select>
              </div>
              <div className="form-field time-field">
                <div className="field-icon time-icon"></div>
                <select
                  value={formData.timeSlots}
                  onChange={(e) => handleInputChange('timeSlots', e.target.value)}
                  className="form-input"
                >
                  <option value="">Time Slots</option>
                  {timeSlotOptions.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                <div className="info-icon" title="Customers are kindly advised to provide time slots with a minimum of 30 minutes notice before visiting the restaurant.">
                  <i className="fas fa-info-circle"></i>
                </div>
              </div>
            </div>

            {/* Third Row */}
            <div className="form-row">
              <div className="form-field">
                <div className="field-icon person-icon"></div>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-field">
                <div className="field-icon phone-icon"></div>
                <input
                  type="tel"
                  placeholder="Mobile No."
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-field">
                <div className="field-icon email-icon"></div>
                <input
                  type="email"
                  placeholder="Email Id"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Date Row */}
            <div className="form-row date-row">
              <div className="date-label">Booking Date</div>
              <div className="form-field date-field">
                <input
                  type="date"
                  value={formData.bookingDate}
                  onChange={(e) => handleInputChange('bookingDate', e.target.value)}
                  className="form-input date-input"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="book-now-btn">
              BOOK NOW
            </button>
          </form>
        </div>
      </main>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-header">
              <h2>Booking Confirmation</h2>
              <button className="close-btn" onClick={handleClosePopup}>×</button>
            </div>
            <div className="popup-content">
              <div className="booking-details">
                <h3>Please confirm your booking details:</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Name:</span>
                    <span className="value">{formData.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Mobile:</span>
                    <span className="value">{formData.mobile}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Email:</span>
                    <span className="value">{formData.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">City:</span>
                    <span className="value">{formData.city || 'Not specified'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">State:</span>
                    <span className="value">{formData.state || 'Not specified'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Restaurant:</span>
                    <span className="value">{formData.restaurant || 'Not specified'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Time Slot:</span>
                    <span className="value">{formData.timeSlots || 'Not specified'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Booking Date:</span>
                    <span className="value">{formData.bookingDate}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Male Guests:</span>
                    <span className="value">{formData.male || '0'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Female Guests:</span>
                    <span className="value">{formData.female || '0'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Children:</span>
                    <span className="value">{formData.children || '0'}</span>
                  </div>
                  <div className="detail-item total-guests">
                    <span className="label">Total Guests:</span>
                    <span className="value">
                      {(parseInt(formData.male || 0) + parseInt(formData.female || 0) + parseInt(formData.children || 0))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="popup-actions">
              <button className="cancel-btn" onClick={handleClosePopup}>Cancel</button>
              <button className="confirm-btn" onClick={handleConfirm}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App