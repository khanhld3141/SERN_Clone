import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class DoctorExtra extends Component {
   constructor(props) {
      super(props);
      this.state = {
        
      };
   }

   async componentDidMount() {
   
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
      }
   }

   render() {
   

      return (
         <div className=''>Default page</div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtra);
