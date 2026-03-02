Dependency Injection using tsyringe library

1.  @injector() --- to Inject any file
2. @inject('name of ') private testRepo: ITestingRepository ---inject file to current file

3. Add file to container
    import {container} from 'tsyringe'
    
    container.registerSingleton() --- to register the class and interfaces
    container.registerInstance() --- To register the object and function 

    example: 
    const businessService : container.registerSingleton<IBusinessService>('BUSINESS_SERVICE', BusinessService)

    and the controller use it 
    In BusinessController

    contructor(@inject('BUSINESS_SERVICE') private businessService = IBusinessService)


4. Adding that container file to central container --- config/container.ts

5. To use the file 
   container.resolve<Type>('name in container', <filename> )

  for example : 
  import {BusinessController} from '../controller/businessController'
  const businessController = container.resolve<IBusinessController>('BUSINESS_CONTROLLER', BusinessController)
