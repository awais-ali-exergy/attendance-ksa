// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import Address from './steps-with-validation/Address'
import SocialLinks from './steps-with-validation/SocialLinks'
import PersonalInfo from './steps-with-validation/PersonalInfo'
import AccountDetails from './steps-with-validation/AccountDetails'

const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'account-details',
      title: 'Requester Details',
      subtitle: 'Enter Your Account Details.',
      content: <AccountDetails stepper={stepper} />
    },
    {
      id: 'personal-info',
      title: 'Outlet Detail',
      subtitle: 'Add Personal Info',
      content: <PersonalInfo stepper={stepper} />
    },
    {
      id: 'step-address',
      title: 'Area Detail',
      subtitle: 'Add Address',
      content: <Address stepper={stepper} />
    },
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
    </div>
  )
}

export default WizardHorizontal
