'use client'
import {ComeBackIcon, FilterIcon, MenuIcon, MockIcon} from "@/components/icons";
import React, {useContext} from "react";
import {SidebarContext} from "@/components/lib";
import {useIsMobile} from "@nextui-org/use-is-mobile";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";
import {cn} from "@nextui-org/react";
import {Input, Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/button";

export const Navbar = () => {
	const {transform,curMenu,projectName} = useContext(SidebarContext)
	const {isOpenF, onOpenF, onOpenChangeF,onCloseF} = useDisclosure();

	const {isOpenM, onOpenM, onOpenChangeF,onCloseM} = useDisclosure();

	const isMobile = useIsMobile()
	return (
		<div className={'w-full h-[48px] flex items-center justify-between bg-content1 px-4'}>
			<div className={'font-bold sm:font-medium flex gap-x-4 items-center'}><MenuIcon className={'[&_path]:fill-black dark:[&_path]:fill-white cursor-pointer sm:hidden'} width={'22px'} height={'22px'} onClick={transform}/>{isMobile?projectName:curMenu?.title}</div>
			<div className={'flex items-center gap-x-4 flex-row-reverse'}>
				<ComeBackIcon className={'[&_path]:fill-blue-600 cursor-pointer'} width={'22px'} height={'22px'} onClick={transform}/>
				<FilterIcon className={'[&_path]:fill-black dark:[&_path]:fill-white cursor-pointer sm:block hidden'} width={'20px'} height={'20px'} onClick={transform}/>
				<MockIcon className={'[&_path]:fill-black dark:[&_path]:fill-white cursor-pointer sm:block  hidden'} width={'22px'} height={'22px'} onClick={transform}/>
			</div>
			<Modal isOpen={isOpenF} size={'md'} onOpenChange={onOpenChange} placement={'auto'} >
				<ModalContent>
					{() => (
						<>
							<ModalHeader className={cn("flex flex-col")}>新建聚类</ModalHeader>
							<ModalBody>
								<form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-3 '}>
									<Input errorMessage={errors.title?.message} isInvalid={!!errors.title} size={'md'} labelPlacement={'outside-left'} classNames={{mainWrapper: 'flex-1',label:'min-w-[90px] text-right'}} autoFocus={true}
												 label={'标题'} variant={'bordered'} {...register("title", {required: '请输入标题!',})}/>
									<Input errorMessage={errors.typeMatch?.message} isInvalid={!!errors.typeMatch} size={'md'} labelPlacement={'outside-left'} classNames={{mainWrapper: 'flex-1',label:'min-w-[90px] text-right'}} autoFocus={false}
												 label={'Type匹配'} variant={'bordered'} {...register("typeMatch", {required: '请输入Type匹配!',})}/>
									<Textarea errorMessage={errors.contentMatch?.message} isInvalid={!!errors.contentMatch} size={'md'} labelPlacement={'outside-left'}  classNames={{mainWrapper: 'flex-1',label:'min-w-[90px] text-right',helperWrapper:''}} autoFocus={false}
														label={'Content匹配'} variant={'bordered'} {...register("contentMatch", {required: '请输入Content匹配!',})}/>
									<Input errorMessage={errors.weight?.message} isInvalid={!!errors.weight} size={'md'} labelPlacement={'outside-left'} classNames={{mainWrapper: 'flex-1',label:'min-w-[90px] text-right'}} autoFocus={false}
												 label={'权重'} variant={'bordered'} {...register("weight", {required: '请输入标题!',})}/>
									{error&&!loading && <p className={'text-red-500'}>{error}</p>}
								</form>
							</ModalBody>
							<ModalFooter>
								<Button isLoading={loading} color={'primary'} size={'md'} className={'ml-auto'}
												onClick={handleSubmit(onSubmit)}>提交</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
			<Modal isOpen={isOpen} size={'md'} onOpenChange={onOpenChange} placement={'auto'} >
				<ModalContent>
					{() => (
						<>
							<ModalHeader className={cn("flex flex-col")}>新建聚类</ModalHeader>
							<ModalBody>
								<form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-3 '}>
									<Input errorMessage={errors.title?.message} isInvalid={!!errors.title} size={'md'} labelPlacement={'outside-left'} classNames={{mainWrapper: 'flex-1',label:'min-w-[90px] text-right'}} autoFocus={true}
												 label={'标题'} variant={'bordered'} {...register("title", {required: '请输入标题!',})}/>
									<Input errorMessage={errors.typeMatch?.message} isInvalid={!!errors.typeMatch} size={'md'} labelPlacement={'outside-left'} classNames={{mainWrapper: 'flex-1',label:'min-w-[90px] text-right'}} autoFocus={false}
												 label={'Type匹配'} variant={'bordered'} {...register("typeMatch", {required: '请输入Type匹配!',})}/>
									<Textarea errorMessage={errors.contentMatch?.message} isInvalid={!!errors.contentMatch} size={'md'} labelPlacement={'outside-left'}  classNames={{mainWrapper: 'flex-1',label:'min-w-[90px] text-right',helperWrapper:''}} autoFocus={false}
														label={'Content匹配'} variant={'bordered'} {...register("contentMatch", {required: '请输入Content匹配!',})}/>
									<Input errorMessage={errors.weight?.message} isInvalid={!!errors.weight} size={'md'} labelPlacement={'outside-left'} classNames={{mainWrapper: 'flex-1',label:'min-w-[90px] text-right'}} autoFocus={false}
												 label={'权重'} variant={'bordered'} {...register("weight", {required: '请输入标题!',})}/>
									{error&&!loading && <p className={'text-red-500'}>{error}</p>}
								</form>
							</ModalBody>
							<ModalFooter>
								<Button isLoading={loading} color={'primary'} size={'md'} className={'ml-auto'}
												onClick={handleSubmit(onSubmit)}>提交</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
};
