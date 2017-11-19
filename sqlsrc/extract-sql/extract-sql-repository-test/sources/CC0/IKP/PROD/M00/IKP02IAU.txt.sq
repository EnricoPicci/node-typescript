sql snippet 1
           EXEC SQL                                                             
                INCLUDE IKP0TAAU                                                
           END-EXEC.                                                            


sql snippet 2
           EXEC SQL                                                             
                INCLUDE SQLCA                                                   
           END-EXEC.                                                            


sql snippet 3
           EXEC SQL INCLUDE IKP0C2DB END-EXEC.                                  


sql snippet 4
           EXEC SQL                                                             
               DECLARE :IKPAU-COGNOME-1-1141                                    
                      ,:IKPAU-COGNOME-2-1141                                    
                      ,:IKPAU-COGNOME-PRE-1141                                  
                      ,:IKPAU-NOME-1-1141                                       
                      ,:IKPAU-NOME-2-1141                                       
                      ,:IKPAU-TITOLO-ACC-1141                                   
                      ,:IKPAU-IND1-1141                                         
                      ,:IKPAU-IND2-1141                                         
                      ,:IKPAU-IND3-1141                                         
                      ,:IKPAU-IND4-1141                                         
                      ,:IKPAU-IND5-1141                                         
               VARIABLE CCSID 1141                                              
           END-EXEC.                                                            


sql snippet 5
           EXEC SQL                                                             
               DECLARE :IKPAU-COGNOME-1-1144                                    
                      ,:IKPAU-COGNOME-2-1144                                    
                      ,:IKPAU-COGNOME-PRE-1144                                  
                      ,:IKPAU-NOME-1-1144                                       
                      ,:IKPAU-NOME-2-1144                                       
                      ,:IKPAU-TITOLO-ACC-1144                                   
                      ,:IKPAU-IND1-1144                                         
                      ,:IKPAU-IND2-1144                                         
                      ,:IKPAU-IND3-1144                                         
                      ,:IKPAU-IND4-1144                                         
                      ,:IKPAU-IND5-1144                                         
               VARIABLE CCSID 1144                                              
           END-EXEC.                                                            


sql snippet 6
           EXEC SQL                                                             
                SELECT  IKPAU_COGNOME_1                                         
                     ,  IKPAU_COGNOME_2                                         
                     ,  IKPAU_COGNOME_PRE                                       
                     ,  IKPAU_NOME_1                                            
                     ,  IKPAU_NOME_2                                            
                     ,  IKPAU_TITOLO_ACC                                        
                     ,  IKPAU_IND1                                              
                     ,  IKPAU_IND2                                              
                     ,  IKPAU_IND3                                              
                     ,  IKPAU_IND4                                              
                     ,  IKPAU_IND5                                              
                  INTO :IKPAU-COGNOME-1-1141                                    
                     , :IKPAU-COGNOME-2-1141                                    
                     , :IKPAU-COGNOME-PRE-1141                                  
                     , :IKPAU-NOME-1-1141                                       
                     , :IKPAU-NOME-2-1141                                       
                     , :IKPAU-TITOLO-ACC-1141                                   
                     , :IKPAU-IND1-1141                                         
                     , :IKPAU-IND2-1141                                         
                     , :IKPAU-IND3-1141                                         
                     , :IKPAU-IND4-1141                                         
                     , :IKPAU-IND5-1141                                         
                  FROM  IKPANAG_UNICODE                                         
                 WHERE  IKPAU_BANCA    = :IKPAU-BANCA                           
                   AND  IKPAU_NDG      = :IKPAU-NDG                             
                  WITH UR                                                       
           END-EXEC                                                             


sql snippet 7
           EXEC SQL                                                             
                SELECT  IKPAU_COGNOME_1                                         
                     ,  IKPAU_COGNOME_2                                         
                     ,  IKPAU_COGNOME_PRE                                       
                     ,  IKPAU_NOME_1                                            
                     ,  IKPAU_NOME_2                                            
                     ,  IKPAU_TITOLO_ACC                                        
                     ,  IKPAU_IND1                                              
                     ,  IKPAU_IND2                                              
                     ,  IKPAU_IND3                                              
                     ,  IKPAU_IND4                                              
                     ,  IKPAU_IND5                                              
                  INTO :IKPAU-COGNOME-1-1144                                    
                     , :IKPAU-COGNOME-2-1144                                    
                     , :IKPAU-COGNOME-PRE-1144                                  
                     , :IKPAU-NOME-1-1144                                       
                     , :IKPAU-NOME-2-1144                                       
                     , :IKPAU-TITOLO-ACC-1144                                   
                     , :IKPAU-IND1-1144                                         
                     , :IKPAU-IND2-1144                                         
                     , :IKPAU-IND3-1144                                         
                     , :IKPAU-IND4-1144                                         
                     , :IKPAU-IND5-1144                                         
                  FROM  IKPANAG_UNICODE                                         
                 WHERE  IKPAU_BANCA    = :IKPAU-BANCA                           
                   AND  IKPAU_NDG      = :IKPAU-NDG                             
                  WITH UR                                                       
           END-EXEC                                                             


sql snippet 8
               EXEC SQL                                                         
                    CONNECT RESET                                               
               END-EXEC                                                         


