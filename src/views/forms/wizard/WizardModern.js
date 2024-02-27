// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'
import Tables from '@components/tables'

// ** Steps
import Address from './steps/OutletDetail'
import SocialLinks from './steps/SocialLinks'
import PersonalInfo from './steps/PersonalInfo'
import AccountDetails from './steps/AccountDetails'

// ** Icons Imports
import { FileText, User, MapPin, Link } from 'react-feather'

const WizardModern = (props) => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  // const steps = [
  //   {
  //     id: 'account-details',
  //     title: 'Account Details',
  //     subtitle: 'Enter Your Account Details.',
  //     icon: <FileText size={18} />,
  //     content:<Tables/>
  //   },
  //   {
  //     id: 'personal-info',
  //     title: 'Personal Info',
  //     subtitle: 'Add Personal Info',
  //     icon: <User size={18} />,
  //     content:<Tables/>
  //   },
  //   {
  //     id: 'step-address',
  //     title: 'Address',
  //     subtitle: 'Add Address',
  //     icon: <MapPin size={18} />,
  //     content: <Tables/>
  //   },
  //   {
  //     id: 'social-links',
  //     title: 'Social Links',
  //     subtitle: 'Add Social Links',
  //     icon: <Link size={18} />,
  //     content: <Tables/>
  //   }
  // ]

  return (
    <div className='modern-horizontal-wizard'>
      <Wizard
        type='modern-horizontal'
        ref={ref}
        steps={props?.steps}
        options={{
          linear: false
        }}
        instance={el => setStepper(el)}
      />
    </div>
  )
}

export default WizardModern
