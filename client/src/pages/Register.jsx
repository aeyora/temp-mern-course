import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await customFetch.post('/auth/register', data);
		toast.success('Registration successful. Please log in.', {
			toastId: 'registrationSuccess',
		});
		return redirect('/login');
	} catch (error) {
		toast.error(error?.response?.data?.msg, {
			toastId: 'registrationError',
		});
		return error;
	}
};

const Register = () => {
	return (
		<Wrapper>
			<Form method='post' className='form'>
				<Logo />
				<h4>Register</h4>
				<FormRow type='text' name='name' labelText='First Name' />
				<FormRow type='text' name='lastName' labelText='Last Name' />
				<FormRow type='text' name='location' labelText='Location' />
				<FormRow type='email' name='email' labelText='E-Mail' />
				<FormRow type='password' name='password' labelText='Password' />
				<SubmitBtn />
				<p>
					Already a member?
					<Link to='/login' className='member-btn'>
						Login
					</Link>
				</p>
			</Form>
		</Wrapper>
	);
};
export default Register;
