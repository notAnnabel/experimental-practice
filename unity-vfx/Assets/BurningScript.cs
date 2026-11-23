using UnityEngine;

public class BurningScript : MonoBehaviour
{
    [SerializeField] private Material burningMaterial;

    [SerializeField] private VisualEffect burningVisualEffect; //variable of our visual effect
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            if (burningMaterial.GetFloat("_Burning")==0)
            {
                burningMaterial.SetFloat("_Burning", 1);
                Debug.Log("Burning Started");
            }
            else {
                burningMaterial.SetFloat("_Burning", 0);
                Debug.Log("Burning Stopped");
            }
        }
        
    }
}
