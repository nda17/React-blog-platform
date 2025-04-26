import { IAuthForm } from '@/components/ui/auth-form/auth-form.interface';
import styles from '@/components/ui/auth-form/AuthForm.module.scss';
import { FieldAvatarUrl } from '@/components/ui/auth-form/fields/field-avatar-url/FieldAvatarUrl';
import { CheckboxConfirm } from '@/components/ui/auth-form/fields/field-checkbox/FieldCheckbox';
import { FieldEmail } from '@/components/ui/auth-form/fields/field-email/FieldEmail';
import { FieldPassword } from '@/components/ui/auth-form/fields/field-password/FieldPassword';
import { FieldRepeatPassword } from '@/components/ui/auth-form/fields/field-repeat-password/FieldRepeatPassword';
import { FieldUsername } from '@/components/ui/auth-form/fields/field-username/FieldUsername';
import { IFieldErrors } from '@/components/ui/auth-form/fields/field.interface';
import { SubmitFormButton } from '@/components/ui/buttons/submit-form-button/SubmitFormButton';
import { PUBLIC_PAGES } from '@/config/pages/public.config';
import {
	validateAvatarUrlRegex,
	validateEmailRegex,
	validatePasswordRegex,
	validateUsernameRegex
} from '@/shared/regex';
import { IUser } from '@/types/user.interface';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export const AuthForm: FC<IAuthForm> = ({
	user,
	type = 'sign-up',
	handleRequest
}) => {
	const [validUsername, setValidUsername] = useState<boolean>(false);
	const [validEmail, setValidEmail] = useState<boolean>(false);
	const [validPassword, setValidPassword] = useState<boolean>(false);
	const [validRepeatPassword, setValidRepeatPassword] =
		useState<boolean>(false);
	const [validAvatarUrl, setValidAvatarUrl] = useState<boolean>(false);
	const signUpPage: string = 'sign-up';
	const signInPage: string = 'sign-in';
	const userEditPage: string = 'user-edit';

	const {
		register,
		getValues,
		formState: { errors },
		handleSubmit,
		control
	} = useForm({ mode: 'onChange' });

	const onSubmit = (data: IUser) => {
		handleRequest(data);
	};

	const validateUsername = (value: string) => {
		if (validateUsernameRegex.test(value)) {
			setValidUsername(true);
			return true;
		} else {
			setValidUsername(false);
			return 'Min length 3 and max length 20  characters';
		}
	};

	const validateAvatarUrl = (value: string) => {
		if (validateAvatarUrlRegex.test(value)) {
			setValidAvatarUrl(true);
			return true;
		} else {
			setValidAvatarUrl(false);
			return 'Enter a valid URL';
		}
	};

	const validateEmail = (value: string) => {
		if (validateEmailRegex.test(value)) {
			setValidEmail(true);
			return true;
		} else {
			setValidEmail(false);
			return 'Invalid email address';
		}
	};

	const validatePassword = (value: string) => {
		if (validatePasswordRegex.test(value)) {
			setValidPassword(true);
			return true;
		} else {
			setValidPassword(false);
			return 'Minimum length is 6 characters';
		}
	};

	const validateRepeatPassword = (value: string) => {
		const passwordValue = getValues('password');

		if (value === passwordValue) {
			setValidRepeatPassword(true);
			return true;
		} else {
			setValidRepeatPassword(false);
			return 'Passwords must match';
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
			<h1 className={clsx(styles['title-form'])}>
				{type === signUpPage && 'Create new account'}
				{type === signInPage && 'Sign in'}
				{type === userEditPage && 'Edit profile'}
			</h1>
			<div className={clsx(styles['wrapper-form'])}>
				{type !== signInPage && (
					<FieldUsername
						{...register('username', {
							required: 'Username is required!',
							validate: value => validateUsername(value)
						})}
						validUsername={validUsername}
						defaultValue={
							type === userEditPage && 'username' in user
								? user.username
								: ''
						}
						type="text"
						title="Username"
						errors={errors as IFieldErrors}
					/>
				)}

				<FieldEmail
					{...register('email', {
						required: 'Email is required!',
						validate: value => validateEmail(value)
					})}
					validEmail={validEmail}
					defaultValue={type === userEditPage ? user.email : null}
					type="email"
					title="Email address"
					errors={errors as IFieldErrors}
				/>

				<FieldPassword
					{...register('password', {
						required:
							type !== userEditPage ? 'Password is required' : false,
						validate: value => value.length && validatePassword(value)
					})}
					validPassword={validPassword}
					defaultValue={type === userEditPage ? '123456' : null}
					type="password"
					title={type === userEditPage ? 'New password' : 'Password'}
					errors={errors as IFieldErrors}
				/>

				{type === signUpPage && (
					<FieldRepeatPassword
						{...register('repeatPassword', {
							required: 'Repeat password is required',
							validate: value => validateRepeatPassword(value)
						})}
						validRepeatPassword={validRepeatPassword}
						defaultValue=""
						type="password"
						title="Repeat password"
						errors={errors as IFieldErrors}
					/>
				)}
			</div>

			{type === signUpPage && (
				<div className={clsx(styles['wrapper-confirm-input'])}>
					<div className={clsx(styles['wrapper-checkbox'])}>
						<Controller
							control={control}
							name="isAgree"
							rules={{
								required: 'You must agree to the terms'
							}}
							render={({ field }) => (
								<CheckboxConfirm
									type="checkbox"
									defaultChecked={false}
									{...field}
									errors={errors.isAgree?.message as IFieldErrors}
								/>
							)}
						/>
					</div>
					<p className={clsx(styles['confirm-text'])}>
						I agree to the processing of my personal information
					</p>
				</div>
			)}

			{type === userEditPage && (
				<FieldAvatarUrl
					{...register('avatarUrl', {
						required: 'Avatar image URL is required!',
						validate: value => validateAvatarUrl(value)
					})}
					validAvatarUrl={validAvatarUrl}
					defaultValue={'image' in user ? user.image : null}
					type="url"
					title="Avatar image (url)"
					errors={errors as IFieldErrors}
				/>
			)}

			<div className={clsx(styles['wrapper-button'])}>
				{type === signUpPage && <SubmitFormButton text={'Create'} />}
				{type === signInPage && <SubmitFormButton text={'Login'} />}
				{type === userEditPage && <SubmitFormButton text={'Save'} />}
				<div className={clsx(styles['wrapper-change-form'])}>
					<p className={clsx(styles['change-form-text'])}>
						{type === signUpPage
							? 'Already have an account?'
							: 'Don’t have an account?'}
					</p>
					<Link
						to={
							type === signUpPage
								? PUBLIC_PAGES.SIGN_IN
								: PUBLIC_PAGES.SIGN_UP
						}
						className={clsx(styles['change-form-link'])}
					>
						{type === signUpPage ? 'Sign in' : 'Sign up'}
					</Link>
				</div>
			</div>
		</form>
	);
};
