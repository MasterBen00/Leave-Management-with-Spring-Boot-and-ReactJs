import React, {Component} from 'react'

class Test extends Component {


    state = {
        isLoading: false,
        groups: []
    };

    async componentDidMount() {
        const response = await fetch('/api/allApp');
        const body = await response.json();
        this.setState({ groups: body, isLoading: false });
    }



    render() {
        const {groups, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (



            <div>

                <h2>JUG List</h2>
                {groups.map(group =>
                    <div >
                        {group.requestType}
                        {group.status}
                    </div>
                )}

            </div>




        );
    }
}
export default Test;
