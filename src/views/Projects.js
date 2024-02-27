// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Demo Components
import TableBasic from './tables/reactstrap/TableBasic'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Projects = () => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <TableBasic />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Projects
